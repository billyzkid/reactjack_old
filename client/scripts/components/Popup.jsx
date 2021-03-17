import React, { useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

const timeouts = {
  appear: 300,
  enter: 300,
  exit: 300
};

const animations = {
  center: 'popup-fade',
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
    unmountOnClose,
    onClose,
    children
  } = props;

  const popupRef = useRef(null);
  const maskRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    let timeout;

    if (isOpen) {
      popupRef.current.hidden = false;
    } else {
      timeout = setTimeout(() => popupRef.current.hidden = true, timeouts.exit);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    }
  }, [isOpen]);

  const onMaskClick = () => {
    if (maskClosable) {
      onClose();
    }
  };

  return (
    <div ref={popupRef} className={`popup popup-${position}`} hidden>
      {mask && (
        <CSSTransition nodeRef={maskRef} in={isOpen} timeout={timeouts} classNames='popup-fade' unmountOnExit={unmountOnClose} appear>
          <div ref={maskRef} className='popup-mask' onClick={onMaskClick} />
        </CSSTransition>
      )}
      <CSSTransition nodeRef={contentRef} in={isOpen} timeout={timeouts} classNames={animations[position]} unmountOnExit={unmountOnClose} appear>
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
  unmountOnClose: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node
};

Popup.defaultProps = {
  isOpen: false,
  position: 'center',
  mask: true,
  maskClosable: false,
  unmountOnClose: false,
  onClose: () => {},
  children: null
};

export default Popup;
