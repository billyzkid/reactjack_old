import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

const MODAL_CLOSE_TIMEOUT = 300;

// See usage: http://reactcommunity.org/react-modal/
ReactModal.setAppElement('#root');

// See https://linguinecode.com/post/prevent-re-renders-react-functional-components-react-memo
const Modal = React.memo((props) => {
  console.log('Modal render', props);

  const { className, onRequestClose, children, ...rest } = props;

  return (
    <ReactModal
      onRequestClose={onRequestClose}
      closeTimeoutMS={MODAL_CLOSE_TIMEOUT}
      className={{ base: 'modal-content', afterOpen: 'after-open', beforeClose: 'before-close' }}
      overlayClassName={{ base: 'modal-overlay', afterOpen: 'after-open', beforeClose: 'before-close' }}
      portalClassName={`modal ${className}`}
      htmlOpenClassName={`modal-open ${className}-open`}
      bodyOpenClassName={null}
      {...rest}>
      <p>{children}</p>
      <button onClick={onRequestClose}>Close Modal</button>
    </ReactModal>
  );
});

// Modal.propTypes = {
//   foo: PropTypes.bool.isRequired
// };

export default Modal;
