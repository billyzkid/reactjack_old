import React, { useRef, useEffect, useCallback, useReducer } from 'react';
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
  const focusedElementRef = useRef(null);

  useFocusLock(popupRef);

  useEffect(() => {
    let timeout;

    if (isOpen) {
      if (popupRef.current.hidden) {
        popupRef.current.hidden = false;
        document.documentElement.classList.add('popup-open');
        document.documentElement.classList.add(`${className}-open`);
        focusedElementRef.current = document.activeElement;
        onAfterOpen();
      }
    } else {
      if (!popupRef.current.hidden) {
        timeout = setTimeout(() => {
          popupRef.current.hidden = true;
          document.documentElement.classList.remove('popup-open');
          document.documentElement.classList.remove(`${className}-open`);

          try {
            focusedElementRef.current.focus();
          } catch (x) {
            console.warn('Failed to restore focus', x);
          }

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
    <div ref={popupRef} className={`popup popup-${position} ${className}`} onKeyDown={onKeyDown} hidden>
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

// Focus lock hook
const FOCUSABLE_SELECTORS = [
  '[contenteditable]:not([contenteditable="false"])',
  "[tabindex]",
  "a[href]",
  "audio[controls]",
  "button",
  "iframe",
  "input",
  "select",
  "textarea",
  "video[controls]"
];

const hasNegativeTabIndex = el =>
  el.getAttribute("tabindex") && el.getAttribute("tabindex") < 0;

const getFocusableChildNodes = el => {
  const selectAll = FOCUSABLE_SELECTORS.join(",");
  const nodelist = el.querySelectorAll(selectAll);

  return Array.from(nodelist || []).filter(node => !hasNegativeTabIndex(node));
};

function useFocusLock(ref) {
  useEffect(() => {
    const prevFocusedElement = document.activeElement;

    let focusableNodes = [];

    if (ref && ref.current) {
      focusableNodes = getFocusableChildNodes(ref.current);

      const firstNode = focusableNodes[0];
      if (firstNode) firstNode.focus();
    }

    const onKeyDown = event => {
      const isTab = event.key === "Tab";
      const withShiftKey = event.shiftKey;

      if (!isTab) return;

      const { activeElement } = document;

      const first = focusableNodes[0];
      const last = focusableNodes[focusableNodes.length - 1];

      if (activeElement === first && withShiftKey) {
        last.focus();
        event.preventDefault();
        event.stopPropagation();
      } else if (activeElement === last && !withShiftKey) {
        first.focus();
        event.preventDefault();
        event.stopPropagation();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return function cleanup() {
      window.removeEventListener("keydown", onKeyDown);
      if (prevFocusedElement) prevFocusedElement.focus();
    };
  });
}


Popup.propTypes = {
  className: PropTypes.string,
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
  className: '',
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
