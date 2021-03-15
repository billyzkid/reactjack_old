import React, { Fragment, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useStateContext, useDispatchContext } from '../context.jsx';
import Modal from './Modal.jsx';

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
      <Modal contentLabel="Information" class="info-modal" isOpen={isInfoModalOpen} onRequestClose={closeInfoModal}>
        <p>Information</p>
      </Modal>
      <Modal contentLabel="Profile" class="profile-modal" isOpen={isProfileModalOpen} onRequestClose={closeProfileModal}>
        <p>Profile</p>
      </Modal>
      <Modal contentLabel="Chat" class="chat-modal" isOpen={isChatModalOpen} onRequestClose={closeChatModal}>
        <p>Chat</p>
      </Modal>
      <Modal contentLabel="Music" class="music-modal" isOpen={isMusicModalOpen} onRequestClose={closeMusicModal}>
        <p>Music</p>
      </Modal>
      <Modal contentLabel="Settings" class="settings-modal" isOpen={isSettingsModalOpen} onRequestClose={closeSettingsModal}>
        <p>Settings</p>
      </Modal>
      <Modal contentLabel="Quit" class="quit-modal" isOpen={isQuitModalOpen} onRequestClose={closeQuitModal} shouldCloseOnEsc={false} shouldCloseOnOverlayClick={false}>
        <p>Quit</p>
        <button onClick={closeQuitModal}>Close</button>
      </Modal>
    </Fragment>
  );
};

// Modals.propTypes = {
//   foo: PropTypes.bool.isRequired
// };

export default Modals;
