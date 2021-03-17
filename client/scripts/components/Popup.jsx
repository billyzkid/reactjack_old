import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import classnames from 'classnames';
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
    mask,
    maskClosable,
    onClose,
    wrapClassName,
    position,
    destroyOnClose,
    children
  } = props;

  const onMaskClick = () => {
    if (maskClosable) {
      onClose();
    }
  };

  const rootClassNames = classnames('popup', wrapClassName, `popup__${position}`);
  const maskClassNames = classnames(`popup-mask`, { [`popup-mask__visible`]: mask });
  const contentClassNames = classnames(`popup-content`, `popup-content__${position}`);

  return (
    <Portal node={node}>
      <div className={rootClassNames}>
        <CSSTransition nodeRef={maskNodeRef} in={visible} timeout={duration} classNames={`popup-fade`} appear>
          <div ref={maskNodeRef} className={maskClassNames} onClick={onMaskClick} />
        </CSSTransition>
        <CSSTransition nodeRef={contentNodeRef} in={visible} timeout={duration} classNames={animations[position]} unmountOnExit={destroyOnClose} appear>
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
  onClose: PropTypes.func,
  destroyOnClose: PropTypes.bool,
  wrapClassName: PropTypes.string
};

Popup.defaultProps = {
  visible: false,
  position: 'center',
  mask: true,
  maskClosable: false,
  onClose: () => {},
  destroyOnClose: false,
  wrapClassName: ''
};

export default Popup;
