import React, { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Portal from './Portal.jsx';
import { CSSTransition } from 'react-transition-group';
import { getTabFocusableChildren, setAriaHidden, setAriaVisible } from '../utils.js';

const animations = {
  center: 'popup-zoom',
  top: 'popup-slide-down',
  bottom: 'popup-slide-up',
  left: 'popup-slide-right',
  right: 'popup-slide-left'
};

const timeouts = {
  enter: 500,
  exit: 500
};

const Popup = (props) => {
  console.log('Popup render', props);

  const {
    ariaRole,
    ariaLabel,
    className,
    position,
    isOpen,
    closeOnMaskMouseDown,
    closeOnEscapeKeyDown,
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

    // set initial focus
    contentRef.current.focus();

    // handle tab focus lock
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

      // restore focus to previously active element
      if (prevFocusedElement) {
        prevFocusedElement.focus();
      }
    };
  });

  useEffect(() => {
    // close popup on escape key
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && closeOnEscapeKeyDown) {
        onRequestClose();
        event.stopPropagation();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [closeOnEscapeKeyDown]);

  useEffect(() => {
    let timeout;

    if (isOpen) {
      if (popupRef.current.hidden) {
        popupRef.current.hidden = false;
        document.documentElement.classList.add('popup-open', `${className}-open`);
        document.querySelectorAll(Popup.ariaHiddenSelector).forEach(setAriaHidden);
        onAfterOpen();
      }
    } else {
      if (!popupRef.current.hidden) {
        timeout = setTimeout(() => {
          popupRef.current.hidden = true;
          document.documentElement.classList.remove('popup-open', `${className}-open`);
          document.querySelectorAll(Popup.ariaHiddenSelector).forEach(setAriaVisible);
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

  const onMaskMouseDown = useCallback((event)=> {
    if (closeOnMaskMouseDown) {
      onRequestClose();
    }
  }, [closeOnMaskMouseDown]);

  return (
    <Portal>
      <div ref={popupRef} className={`popup popup-${position} ${className}`} hidden>
        <CSSTransition nodeRef={maskRef} in={isOpen} classNames='popup-fade' timeout={timeouts} unmountOnExit={unmountOnClose}>
          <div ref={maskRef} className='popup-mask' onMouseDown={onMaskMouseDown} />
        </CSSTransition>
        <CSSTransition nodeRef={contentRef} in={isOpen} classNames={animations[position]} timeout={timeouts} unmountOnExit={unmountOnClose}>
          <div ref={contentRef} className='popup-content' tabIndex='-1' role={ariaRole} aria-label={ariaLabel}>{children}</div>
        </CSSTransition>
      </div>
    </Portal>
  );
};

Popup.ariaHiddenSelector = '#app';

Popup.propTypes = {
  ariaRole: PropTypes.string,
  ariaLabel: PropTypes.string,
  className: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['center', 'top', 'bottom', 'left', 'right']),
  isOpen: PropTypes.bool.isRequired,
  closeOnMaskMouseDown: PropTypes.bool,
  closeOnEscapeKeyDown: PropTypes.bool,
  unmountOnClose: PropTypes.bool,
  onAfterOpen: PropTypes.func,
  onAfterClose: PropTypes.func,
  onRequestClose: PropTypes.func,
  children: PropTypes.node
};

Popup.defaultProps = {
  ariaRole: 'dialog',
  ariaLabel: null,
  className: null,
  position: 'center',
  isOpen: false,
  closeOnMaskMouseDown: true,
  closeOnEscapeKeyDown: true,
  unmountOnClose: false,
  onAfterOpen: () => {},
  onAfterClose: () => {},
  onRequestClose: () => {},
  children: null
};

export default Popup;
