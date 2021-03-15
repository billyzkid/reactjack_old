import React, { Fragment, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useStateContext, useDispatchContext } from '../context.jsx';
import Modal from './Modal.jsx';

const Modals = (props) => {
  console.log('Modals render', props);

  const { isModal1Open, isModal2Open, isModal3Open } = useStateContext();
  const dispatch = useDispatchContext();
  const closeModal1 = useCallback(()=> { dispatch({ type: 'toggleModal1', isOpen: false }) }, []);
  const closeModal2 = useCallback(()=> { dispatch({ type: 'toggleModal2', isOpen: false }) }, []);
  const closeModal3 = useCallback(()=> { dispatch({ type: 'toggleModal3', isOpen: false }) }, []);

  return (
    <Fragment>
      <Modal contentLabel="Modal 1" className="modal1" isOpen={isModal1Open} onRequestClose={closeModal1}>
        Modal 1 Content
      </Modal>
      <Modal contentLabel="Modal 2" className="modal2" isOpen={isModal2Open} onRequestClose={closeModal2}>
        Modal 2 Content
      </Modal>
      <Modal contentLabel="Modal 3" className="modal3" isOpen={isModal3Open} onRequestClose={closeModal3} shouldCloseOnEsc={false} shouldCloseOnOverlayClick={false}>
        Modal 3 Content
      </Modal>
    </Fragment>
  );
};

// Modals.propTypes = {
//   foo: PropTypes.bool.isRequired
// };

export default Modals;
