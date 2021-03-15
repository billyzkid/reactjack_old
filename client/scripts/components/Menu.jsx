import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatchContext } from '../context.jsx';

const Menu = (props) => {
  console.log('Menu render', props);

  const dispatch = useDispatchContext();

  const openModal1 = useCallback(()=> { dispatch({ type: 'toggleModal1', isOpen: true }) }, []);
  const openModal2 = useCallback(()=> { dispatch({ type: 'toggleModal2', isOpen: true }) }, []);
  const openModal3 = useCallback(()=> { dispatch({ type: 'toggleModal3', isOpen: true }) }, []);
  const openModal4 = useCallback(()=> { dispatch({ type: 'toggleModal4', isOpen: true }) }, []);
  const openModal5 = useCallback(()=> { dispatch({ type: 'toggleModal5', isOpen: true }) }, []);
  const openModal6 = useCallback(()=> { dispatch({ type: 'toggleModal6', isOpen: true }) }, []);

  return (
    <div class="menu">
      <button class="las la-info-circle" aria-label="Information" onClick={openModal1}></button>
      <button class="las la-user-circle" aria-label="Profile" onClick={openModal2}></button>
      <button class="las la-comments" aria-label="Chat" onClick={openModal3}></button>
      <button class="las la-music" aria-label="Music" onClick={openModal4}></button>
      <button class="las la-cog" aria-label="Settings" onClick={openModal5}></button>
      <button class="las la-sign-out-alt" aria-label="Quit" onClick={openModal6}></button>
    </div>
  );
};

// Menu.propTypes = {
//   foo: PropTypes.bool.isRequired
// };

export default Menu;
