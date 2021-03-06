import React, { useCallback } from 'react';
import { useDispatchContext } from '../hooks.js';

const MainMenu = (props) => {
  console.log('MainMenu render', props);

  const dispatch = useDispatchContext();

  const openInfoPopup = useCallback(() => dispatch({ type: 'toggleInfoPopup', isOpen: true }), []);
  const openProfilePopup = useCallback(() => dispatch({ type: 'toggleProfilePopup', isOpen: true }), []);
  const openChatPopup = useCallback(() => dispatch({ type: 'toggleChatPopup', isOpen: true }), []);
  const openMusicPopup = useCallback(() => dispatch({ type: 'toggleMusicPopup', isOpen: true }), []);
  const openSettingsPopup = useCallback(() => dispatch({ type: 'toggleSettingsPopup', isOpen: true }), []);
  const openQuitPopup = useCallback(() => dispatch({ type: 'toggleQuitPopup', isOpen: true }), []);

  return (
    <div className="main-menu">
      <button className="popup-button info-popup-button" aria-label="Information" onClick={openInfoPopup}></button>
      <button className="popup-button profile-popup-button" aria-label="Profile" onClick={openProfilePopup}></button>
      <button className="popup-button chat-popup-button" aria-label="Chat" onClick={openChatPopup}></button>
      <button className="popup-button music-popup-button" aria-label="Music" onClick={openMusicPopup}></button>
      <button className="popup-button settings-popup-button" aria-label="Settings" onClick={openSettingsPopup}></button>
      <button className="popup-button quit-popup-button" aria-label="Quit" onClick={openQuitPopup}></button>
    </div>
  );
};

export default MainMenu;
