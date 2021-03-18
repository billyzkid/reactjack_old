import React, { Fragment, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useStateContext, useDispatchContext } from '../context.jsx';
import Modal from './Modal.jsx';
import Popup from './Popup.jsx';

const Modals = (props) => {
  console.log('Modals render', props);

  const { isInfoModalOpen, isProfileModalOpen, isChatModalOpen, isMusicModalOpen, isSettingsModalOpen, isQuitModalOpen } = useStateContext();
  const dispatch = useDispatchContext();

  const closeInfoModal = useCallback(()=> { dispatch({ type: 'toggleInfoModal', isOpen: false }); }, []);
  const closeProfileModal = useCallback(()=> { dispatch({ type: 'toggleProfileModal', isOpen: false }); }, []);
  const closeChatModal = useCallback(()=> { dispatch({ type: 'toggleChatModal', isOpen: false }); }, []);
  const closeMusicModal = useCallback(()=> { dispatch({ type: 'toggleMusicModal', isOpen: false }); }, []);
  const closeSettingsModal = useCallback(()=> { dispatch({ type: 'toggleSettingsModal', isOpen: false }); }, []);
  const closeQuitModal = useCallback(()=> { dispatch({ type: 'toggleQuitModal', isOpen: false }); }, []);

  const inputRef = useRef(null);
  const iframeRef = useRef(null);

  const onAfterInfoModalOpen = useCallback(()=> { inputRef.current.focus(); }, []);
  const onAfterMusicModalOpen = useCallback(()=> { iframeRef.current.focus(); }, []);

  return (
    <Fragment>
      {/* <Modal contentLabel='Information' className='info-modal' isOpen={isInfoModalOpen} onAfterOpen={onAfterInfoModalOpen} onRequestClose={closeInfoModal}>
        <p>Information</p>
        <input ref={inputRef} />
      </Modal> */}
      <Modal contentLabel='Profile' className='profile-modal' isOpen={isProfileModalOpen} onRequestClose={closeProfileModal}>
        <p>Profile</p>
      </Modal>
      <Modal contentLabel='Chat' className='chat-modal' isOpen={isChatModalOpen} onRequestClose={closeChatModal}>
        <p>Chat</p>
      </Modal>
      {/* <Modal contentLabel='Music' className='music-modal' isOpen={isMusicModalOpen} onRequestClose={closeMusicModal}>
        <iframe src="https://open.spotify.com/embed/playlist/7FJ5yarckSPshvmaP4ywBI" allowtransparency="true" allow="encrypted-media" />
      </Modal> */}
      <Modal contentLabel='Settings' className='settings-modal' isOpen={isSettingsModalOpen} onRequestClose={closeSettingsModal}>
        <p>Settings</p>
      </Modal>
      <Modal contentLabel='Quit' className='quit-modal' isOpen={isQuitModalOpen} onRequestClose={closeQuitModal} shouldCloseOnEsc={false} shouldCloseOnOverlayClick={false}>
        <p>Quit</p>
        <button onClick={closeQuitModal}>Close</button>
      </Modal>
      <Popup label='Information' className='info-popup' isOpen={isInfoModalOpen} onAfterOpen={onAfterInfoModalOpen} onRequestClose={closeInfoModal}>
        <p>Information</p>
        <input ref={inputRef} />
      </Popup>
      <Popup label='Music' className='music-popup' isOpen={isMusicModalOpen} onAfterOpen={onAfterMusicModalOpen} onRequestClose={closeMusicModal}>
        <iframe ref={iframeRef} src="https://open.spotify.com/embed/playlist/7FJ5yarckSPshvmaP4ywBI" allowtransparency="true" allow="encrypted-media" />
      </Popup>
    </Fragment>
  );
};

// Modals.propTypes = {
//   foo: PropTypes.bool.isRequired
// };

export default Modals;
