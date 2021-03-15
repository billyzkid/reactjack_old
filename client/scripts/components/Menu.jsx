import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatchContext } from '../context.jsx';

const Menu = (props) => {
  console.log('Menu render', props);

  const dispatch = useDispatchContext();

  const openInfoModal = useCallback(()=> { dispatch({ type: 'toggleInfoModal', isOpen: true }) }, []);
  const openProfileModal = useCallback(()=> { dispatch({ type: 'toggleProfileModal', isOpen: true }) }, []);
  const openChatModal = useCallback(()=> { dispatch({ type: 'toggleChatModal', isOpen: true }) }, []);
  const openMusicModal = useCallback(()=> { dispatch({ type: 'toggleMusicModal', isOpen: true }) }, []);
  const openSettingsModal = useCallback(()=> { dispatch({ type: 'toggleSettingsModal', isOpen: true }) }, []);
  const openQuitModal = useCallback(()=> { dispatch({ type: 'toggleQuitModal', isOpen: true }) }, []);

  return (
    <div class="menu">
      <button class="info-modal-button las la-info-circle" aria-label="Information" onClick={openInfoModal}></button>
      <button class="profile-modal-button las la-user-circle" aria-label="Profile" onClick={openProfileModal}></button>
      <button class="chat-modal-button las la-comments" aria-label="Chat" onClick={openChatModal}></button>
      <button class="music-modal-button las la-music" aria-label="Music" onClick={openMusicModal}></button>
      <button class="settings-modal-button las la-cog" aria-label="Settings" onClick={openSettingsModal}></button>
      <button class="quit-modal-button las la-sign-out-alt" aria-label="Quit" onClick={openQuitModal}></button>
    </div>
  );
};

// Menu.propTypes = {
//   foo: PropTypes.bool.isRequired
// };

export default Menu;
