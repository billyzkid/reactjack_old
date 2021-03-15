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
      <button class="modal-button info-modal-button" aria-label="Information" onClick={openInfoModal}></button>
      <button class="modal-button profile-modal-button" aria-label="Profile" onClick={openProfileModal}></button>
      <button class="modal-button chat-modal-button" aria-label="Chat" onClick={openChatModal}></button>
      <button class="modal-button music-modal-button" aria-label="Music" onClick={openMusicModal}></button>
      <button class="modal-button settings-modal-button" aria-label="Settings" onClick={openSettingsModal}></button>
      <button class="modal-button quit-modal-button" aria-label="Quit" onClick={openQuitModal}></button>
    </div>
  );
};

// Menu.propTypes = {
//   foo: PropTypes.bool.isRequired
// };

export default Menu;
