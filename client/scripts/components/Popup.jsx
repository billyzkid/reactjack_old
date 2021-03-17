import React, { useRef, useEffect, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

const timeouts = {
  enter: 300,
  exit: 200
};

const animations = {
  center: 'popup-zoom',
  top: 'popup-slide-down',
  bottom: 'popup-slide-up',
  left: 'popup-slide-right',
  right: 'popup-slide-left'
};

const Popup = (props) => {
  console.log('Popup render', props);

  const {
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
    let timeout;

    if (isOpen) {
      if (popupRef.current.hidden) {
        popupRef.current.hidden = false;
        onAfterOpen();
      }
    } else {
      if (!popupRef.current.hidden) {
        timeout = setTimeout(() => {
          popupRef.current.hidden = true;
          onAfterClose();
        }, timeouts.exit);
      }
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    }
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
    <div ref={popupRef} className={`popup popup-${position}`} onKeyDown={onKeyDown} hidden>
      {mask && (
        <CSSTransition nodeRef={maskRef} in={isOpen} classNames='popup-fade' timeout={timeouts} unmountOnExit={unmountOnClose}>
          <div ref={maskRef} className='popup-mask' onClick={onMaskClick} />
        </CSSTransition>
      )}
      <CSSTransition nodeRef={contentRef} in={isOpen} classNames={animations[position]} timeout={timeouts} unmountOnExit={unmountOnClose}>
        <div ref={contentRef} className='popup-content'>{children}</div>
      </CSSTransition>
    </div>
  );
};

Popup.propTypes = {
  isOpen: PropTypes.bool,
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
