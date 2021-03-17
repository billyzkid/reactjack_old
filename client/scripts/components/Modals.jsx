import React, { Fragment, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useStateContext, useDispatchContext } from '../context.jsx';
import Modal from './Modal.jsx';
import Popup from './Popup.jsx';

const Modals = (props) => {
  console.log('Modals render', props);

  const { isInfoModalOpen, isProfileModalOpen, isChatModalOpen, isMusicModalOpen, isSettingsModalOpen, isQuitModalOpen } = useStateContext();
  const dispatch = useDispatchContext();

  const closeInfoModal = useCallback(()=> { dispatch({ type: 'toggleInfoModal', isOpen: false }) }, []);
  const closeProfileModal = useCallback(()=> { dispatch({ type: 'toggleProfileModal', isOpen: false }) }, []);
  const closeChatModal = useCallback(()=> { dispatch({ type: 'toggleChatModal', isOpen: false }) }, []);
  const closeMusicModal = useCallback(()=> { dispatch({ type: 'toggleMusicModal', isOpen: false }) }, []);
  const closeSettingsModal = useCallback(()=> { dispatch({ type: 'toggleSettingsModal', isOpen: false }) }, []);
  const closeQuitModal = useCallback(()=> { dispatch({ type: 'toggleQuitModal', isOpen: false }) }, []);

  return (
    <Fragment>
      {/* <Modal contentLabel='Information' className='info-modal' isOpen={isInfoModalOpen} onRequestClose={closeInfoModal}>
        <p>Information</p>
      </Modal> */}
      <Modal contentLabel='Profile' className='profile-modal' isOpen={isProfileModalOpen} onRequestClose={closeProfileModal}>
        <p>Profile</p>
      </Modal>
      <Modal contentLabel='Chat' className='chat-modal' isOpen={isChatModalOpen} onRequestClose={closeChatModal}>
        <p>Chat</p>
      </Modal>
      <Modal contentLabel='Music' className='music-modal' isOpen={isMusicModalOpen} onRequestClose={closeMusicModal}>
        <p>Music</p>
      </Modal>
      <Modal contentLabel='Settings' className='settings-modal' isOpen={isSettingsModalOpen} onRequestClose={closeSettingsModal}>
        <p>Settings</p>
      </Modal>
      <Modal contentLabel='Quit' className='quit-modal' isOpen={isQuitModalOpen} onRequestClose={closeQuitModal} shouldCloseOnEsc={false} shouldCloseOnOverlayClick={false}>
        <p>Quit</p>
        <button onClick={closeQuitModal}>Close</button>
      </Modal>
      <Popup isOpen={isInfoModalOpen} maskClosable={true} onClose={closeInfoModal}>
        <iframe src='https://open.spotify.com/embed/playlist/7FJ5yarckSPshvmaP4ywBI' allowtransparency='true' allow='encrypted-media' />
      </Popup>
    </Fragment>
  );
};

// Modals.propTypes = {
//   foo: PropTypes.bool.isRequired
// };

export default Modals;
