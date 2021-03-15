import React, { Fragment, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useStateContext, useDispatchContext } from '../context.jsx';
import Modal from './Modal.jsx';

const Modals = (props) => {
  console.log('Modals render', props);

  const { isModal1Open, isModal2Open, isModal3Open, isModal4Open, isModal5Open, isModal6Open } = useStateContext();
  const dispatch = useDispatchContext();

  const closeModal1 = useCallback(()=> { dispatch({ type: 'toggleModal1', isOpen: false }) }, []);
  const closeModal2 = useCallback(()=> { dispatch({ type: 'toggleModal2', isOpen: false }) }, []);
  const closeModal3 = useCallback(()=> { dispatch({ type: 'toggleModal3', isOpen: false }) }, []);
  const closeModal4 = useCallback(()=> { dispatch({ type: 'toggleModal4', isOpen: false }) }, []);
  const closeModal5 = useCallback(()=> { dispatch({ type: 'toggleModal5', isOpen: false }) }, []);
  const closeModal6 = useCallback(()=> { dispatch({ type: 'toggleModal6', isOpen: false }) }, []);

  return (
    <Fragment>
      <Modal contentLabel="Modal 1" className="modal1" isOpen={isModal1Open} onRequestClose={closeModal1}>
        Modal 1 Content
      </Modal>
      <Modal contentLabel="Modal 2" className="modal2" isOpen={isModal2Open} onRequestClose={closeModal2}>
        Modal 2 Content
      </Modal>
      <Modal contentLabel="Modal 3" className="modal3" isOpen={isModal3Open} onRequestClose={closeModal3}>
        Modal 3 Content
      </Modal>
      <Modal contentLabel="Modal 4" className="modal4" isOpen={isModal4Open} onRequestClose={closeModal4}>
        Modal 4 Content
      </Modal>
      <Modal contentLabel="Modal 5" className="modal5" isOpen={isModal5Open} onRequestClose={closeModal5}>
        Modal 5 Content
      </Modal>
      <Modal contentLabel="Modal 6" className="modal6" isOpen={isModal6Open} onRequestClose={closeModal6} shouldCloseOnEsc={false} shouldCloseOnOverlayClick={false}>
        Modal 6 Content
      </Modal>
    </Fragment>
  );
};

// Modals.propTypes = {
//   foo: PropTypes.bool.isRequired
// };

export default Modals;
