import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import Portal from './Portal.jsx';

const duration = 300;

const animations = {
  bottom: 'popup-slide-up',
  right: 'popup-slide-left',
  left: 'popup-slide-right',
  top: 'popup-slide-down',
  center: 'popup-fade'
};

const Popup = (props) => {
  console.log('Popup render', props);

  const { visible } = props;
  const maskNodeRef = useRef(null);
  const contentNodeRef = useRef(null);
  const firstRenderRef = useRef(false);

  if (!firstRenderRef.current && !visible) {
    return null;
  }

  if (!firstRenderRef.current) {
    firstRenderRef.current = true;
  }

  const {
    node,
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

  const rootClassNames = `popup popup__${position}`;
  const maskClassNames = `popup-mask ${mask ? 'popup-mask__visible' : ''}`;
  const contentClassNames = `popup-content popup-content__${position}`;

  return (
    <Portal node={node}>
      <div className={rootClassNames}>
        <CSSTransition nodeRef={maskNodeRef} in={visible} timeout={duration} classNames={`popup-fade`} unmountOnExit={unmountOnClose} appear>
          <div ref={maskNodeRef} className={maskClassNames} onClick={onMaskClick} />
        </CSSTransition>
        <CSSTransition nodeRef={contentNodeRef} in={visible} timeout={duration} classNames={animations[position]} unmountOnExit={unmountOnClose} appear>
          <div ref={contentNodeRef} className={contentClassNames}>{children}</div>
        </CSSTransition>
      </div>
    </Portal>
  );
};

Popup.propTypes = {
  visible: PropTypes.bool,
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left', 'center']),
  mask: PropTypes.bool,
  maskClosable: PropTypes.bool,
  unmountOnClose: PropTypes.bool,
  onClose: PropTypes.func
};

Popup.defaultProps = {
  visible: false,
  position: 'center',
  mask: true,
  maskClosable: false,
  unmountOnClose: false,
  onClose: () => {}
};

export default Popup;
