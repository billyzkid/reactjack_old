import React, { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { getTabFocusableChildren } from '../utils.js';

const animations = {
  center: 'popup-zoom',
  top: 'popup-slide-down',
  bottom: 'popup-slide-up',
  left: 'popup-slide-right',
  right: 'popup-slide-left'
};

const timeouts = {
  enter: 300,
  exit: 200
};

const Popup = (props) => {
  console.log('Popup render', props);

  const {
    role,
    label,
    className,
    isOpen,
    position,
    mask,
    maskClosable,
    escKeyClosable,
    unmountOnClose,
    onAfterOpen,
    onAfterClose,
    onRequestClose,
    children
  } = props;

  const popupRef = useRef(null);
  const maskRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const prevFocusedElement = document.activeElement;
    const tabFocusableChildren = getTabFocusableChildren(popupRef.current);
    const firstTabFocusableChild = tabFocusableChildren[0];
    const lastTabFocusableChild = tabFocusableChildren[tabFocusableChildren.length - 1];

    const onKeyDown = (event) => {
      if (event.key === 'Tab') {
        const focusedElement = document.activeElement;

        if (focusedElement === firstTabFocusableChild && event.shiftKey) {
          lastTabFocusableChild.focus();
          event.preventDefault();
          event.stopPropagation();
        } else if (focusedElement === lastTabFocusableChild && !event.shiftKey) {
          firstTabFocusableChild.focus();
          event.preventDefault();
          event.stopPropagation();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);

      if (prevFocusedElement) {
        prevFocusedElement.focus();
      }
    };
  });

  useEffect(() => {
    let timeout;

    if (isOpen) {
      if (popupRef.current.hidden) {
        popupRef.current.hidden = false;
        document.documentElement.classList.add('popup-open', `${className}-open`);
        contentRef.current.focus();
        onAfterOpen();
      }
    } else {
      if (!popupRef.current.hidden) {
        timeout = setTimeout(() => {
          popupRef.current.hidden = true;
          document.documentElement.classList.remove('popup-open', `${className}-open`);
          onAfterClose();
        }, timeouts.exit);
      }
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isOpen]);

  const onKeyDown = useCallback((event)=> {
    if (event.key === 'Escape' && escKeyClosable) {
      event.stopPropagation();
      onRequestClose();
    }
  }, [escKeyClosable]);

  const onMaskClick = useCallback(()=> {
    if (maskClosable) {
      onRequestClose();
    }
  }, [maskClosable]);

  return (
    <div ref={popupRef} className={`popup popup-${position} ${className}`} onKeyDown={onKeyDown} hidden>
      {mask && (
        <CSSTransition nodeRef={maskRef} in={isOpen} classNames='popup-fade' timeout={timeouts} unmountOnExit={unmountOnClose}>
          <div ref={maskRef} className='popup-mask' onClick={onMaskClick} />
        </CSSTransition>
      )}
      <CSSTransition nodeRef={contentRef} in={isOpen} classNames={animations[position]} timeout={timeouts} unmountOnExit={unmountOnClose}>
        <div ref={contentRef} className='popup-content' tabIndex='-1' role={role} aria-label={label}>{children}</div>
      </CSSTransition>
    </div>
  );
};

Popup.propTypes = {
  role: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  position: PropTypes.oneOf(['center', 'top', 'bottom', 'left', 'right']),
  mask: PropTypes.bool,
  maskClosable: PropTypes.bool,
  escKeyClosable: PropTypes.bool,
  unmountOnClose: PropTypes.bool,
  onAfterOpen: PropTypes.func,
  onAfterClose: PropTypes.func,
  onRequestClose: PropTypes.func,
  children: PropTypes.node
};

Popup.defaultProps = {
  role: 'dialog',
  label: null,
  className: null,
  isOpen: false,
  position: 'center',
  mask: true,
  maskClosable: true,
  escKeyClosable: true,
  unmountOnClose: false,
  onAfterOpen: () => {},
  onAfterClose: () => {},
  onRequestClose: () => {},
  children: null
};

export default Popup;
