import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Portal from './Portal.jsx';

const prefixCls = 'react-easy-popup';
const duration = 300;
const animations = {
  bottom: prefixCls + "-slide-up",
  right: prefixCls + "-slide-left",
  left: prefixCls + "-slide-right",
  top: prefixCls + "-slide-down",
  center: prefixCls + "-fade"
};

const Popup = (props) => {
  const firstRenderRef = useRef(false);
  const { visible } = props;

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
    children,
  } = props;

  const onMaskClick = () => {
    if (maskClosable) {
      onClose();
    }
  };

  const rootCls = classnames(prefixCls, wrapClassName, `${prefixCls}__${position}`);
  const maskCls = classnames(`${prefixCls}-mask`, { [`${prefixCls}-mask__visible`]: mask });
  const contentCls = classnames(`${prefixCls}-content`, `${prefixCls}-content__${position}`);
  const contentAnimation = animations[position];

  return (
    <Portal node={node}>
      <div className={rootCls}>
        <CSSTransition in={visible} timeout={duration} classNames={`${prefixCls}-fade`} appear>
          <div className={maskCls} onClick={onMaskClick} />
        </CSSTransition>
        <CSSTransition in={visible} timeout={duration} classNames={contentAnimation} unmountOnExit={destroyOnClose} appear>
          <div className={contentCls}>{children}</div>
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
  stopScrollUnderMask: PropTypes.bool,
  destroyOnClose: PropTypes.bool,
  wrapClassName: PropTypes.string,
};

Popup.defaultProps = {
  visible: false,
  position: 'center',
  mask: true,
  maskClosable: false,
  onClose: () => {},
  // stopScrollUnderMask: true,
  destroyOnClose: false,
  wrapClassName: '',
};

export default Popup;
