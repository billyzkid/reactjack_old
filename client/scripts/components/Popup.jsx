import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import Portal from './Portal.jsx';

const duration = 300;

const animations = {
  center: 'popup-fade',
  top: 'popup-slide-down',
  bottom: 'popup-slide-up',
  left: 'popup-slide-right',
  right: 'popup-slide-left'
};

const Popup = (props) => {
  console.log('Popup render', props);

  const { isOpen } = props;
  const maskNodeRef = useRef(null);
  const contentNodeRef = useRef(null);
  const firstRenderRef = useRef(false);

  if (!firstRenderRef.current && !isOpen) {
    return null;
  }

  if (!firstRenderRef.current) {
    firstRenderRef.current = true;
  }

  const {
    children,
    position,
    mask,
    maskClosable,
    unmountOnClose,
    onClose
  } = props;

  const onMaskClick = () => {
    if (maskClosable) {
      onClose();
    }
  };

  return (
    <Portal className={`popup popup__${position}`}>
      {mask && (
        <CSSTransition nodeRef={maskNodeRef} in={isOpen} timeout={duration} classNames='popup-fade' unmountOnExit={unmountOnClose} appear>
          <div ref={maskNodeRef} className='popup-mask' onClick={onMaskClick} />
        </CSSTransition>
      )}
      <CSSTransition nodeRef={contentNodeRef} in={isOpen} timeout={duration} classNames={animations[position]} unmountOnExit={unmountOnClose} appear>
        <div ref={contentNodeRef} className='popup-content'>{children}</div>
      </CSSTransition>
    </Portal>
  );
};

Popup.propTypes = {
  isOpen: PropTypes.bool,
  position: PropTypes.oneOf(['center', 'top', 'bottom', 'left', 'right']),
  mask: PropTypes.bool,
  maskClosable: PropTypes.bool,
  unmountOnClose: PropTypes.bool,
  onClose: PropTypes.func
};

Popup.defaultProps = {
  isOpen: false,
  position: 'center',
  mask: true,
  maskClosable: false,
  unmountOnClose: false,
  onClose: () => {}
};

export default Popup;
