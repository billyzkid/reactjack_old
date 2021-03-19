import React, { Fragment, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useStateContext, useDispatchContext } from '../hooks.js';
import Popup from './Popup.jsx';

const Popups = (props) => {
  console.log('Popups render', props);

  const { isInfoPopupOpen, isProfilePopupOpen, isChatPopupOpen, isMusicPopupOpen, isSettingsPopupOpen, isQuitPopupOpen } = useStateContext();
  const dispatch = useDispatchContext();

  const closeInfoPopup = useCallback(() => { dispatch({ type: 'toggleInfoPopup', isOpen: false }); }, []);
  const closeProfilePopup = useCallback(() => { dispatch({ type: 'toggleProfilePopup', isOpen: false }); }, []);
  const closeChatPopup = useCallback(() => { dispatch({ type: 'toggleChatPopup', isOpen: false }); }, []);
  const closeMusicPopup = useCallback(() => { dispatch({ type: 'toggleMusicPopup', isOpen: false }); }, []);
  const closeSettingsPopup = useCallback(() => { dispatch({ type: 'toggleSettingsPopup', isOpen: false }); }, []);
  const closeQuitPopup = useCallback(() => { dispatch({ type: 'toggleQuitPopup', isOpen: false }); }, []);

  const inputRef = useRef(null);
  const onAfterProfilePopupOpen = useCallback(() => { inputRef.current.focus(); }, []);

  return (
    <Fragment>
      <Popup ariaLabel="Information" className="info-popup" isOpen={isInfoPopupOpen} onRequestClose={closeInfoPopup}>
        <p>Information</p>
      </Popup>
      <Popup ariaLabel="Profile" className="profile-popup" isOpen={isProfilePopupOpen} onAfterOpen={onAfterProfilePopupOpen} onRequestClose={closeProfilePopup}>
        <p>Profile</p>
        <input ref={inputRef} />
      </Popup>
      <Popup ariaLabel="Chat" className="chat-popup" isOpen={isChatPopupOpen} onRequestClose={closeChatPopup}>
        <p>Chat</p>
      </Popup>
      <Popup ariaLabel="Music" className="music-popup" isOpen={isMusicPopupOpen} onRequestClose={closeMusicPopup}>
        <iframe src="https://open.spotify.com/embed/playlist/7FJ5yarckSPshvmaP4ywBI" allowtransparency="true" allow="encrypted-media" />
      </Popup>
      <Popup ariaLabel="Settings" className="settings-popup" isOpen={isSettingsPopupOpen} onRequestClose={closeSettingsPopup}>
        <p>Settings</p>
      </Popup>
      <Popup ariaLabel="Quit" className="quit-popup" isOpen={isQuitPopupOpen} onRequestClose={closeQuitPopup} closeOnMaskMouseDown={false} closeOnEscapeKeyDown={false}>
        <p>Quit</p>
        <button onClick={closeQuitPopup}>Close</button>
      </Popup>
    </Fragment>
  );
};

// Popups.propTypes = {
//   foo: PropTypes.bool.isRequired
// };

export default Popups;
