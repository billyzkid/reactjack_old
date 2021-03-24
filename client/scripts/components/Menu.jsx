import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatchContext, useStateContext } from '../hooks.js';

const Menu = (props) => {
  console.log('Menu render', props);

  const { players } = useStateContext();
  const dispatch = useDispatchContext();

  const openInfoPopup = useCallback(() => { dispatch({ type: 'toggleInfoPopup', isOpen: true }); }, []);
  const openProfilePopup = useCallback(() => { dispatch({ type: 'toggleProfilePopup', isOpen: true }); }, []);
  const openChatPopup = useCallback(() => { dispatch({ type: 'toggleChatPopup', isOpen: true }); }, []);
  const openMusicPopup = useCallback(() => { dispatch({ type: 'toggleMusicPopup', isOpen: true }); }, []);
  const openSettingsPopup = useCallback(() => { dispatch({ type: 'toggleSettingsPopup', isOpen: true }); }, []);
  const openQuitPopup = useCallback(() => { dispatch({ type: 'toggleQuitPopup', isOpen: true }); }, []);
  const dealCardToDealer = useCallback(() => { dispatch({ type: 'dealCardToDealer', card: { rank: 'ace', suit: 'spades' } }); }, []);
  const dealCardToPlayer = useCallback(() => { dispatch({ type: 'dealCardToPlayer', playerId: players[players.length - 1].id, handIndex: 0, card: { rank: 'ace', suit: 'spades' } }); }, [players]);
  const sweepCardsFromDealer = useCallback(() => { dispatch({ type: 'sweepCardsFromDealer' }); }, []);
  const sweepCardsFromPlayer = useCallback(() => { dispatch({ type: 'sweepCardsFromPlayer', playerId: players[players.length - 1].id, handIndex: 0 }); }, [players]);
  const flipHoleCard = useCallback(() => { dispatch({ type: 'flipHoleCard' }); }, []);
  const addPlayer = useCallback(() => { dispatch({ type: 'addPlayer', player: {
    id: Date.now() + Math.random(),
    name: 'Avery',
    primary: false,
    active: false,
    chips: 1000,
    hands: [
      {
        active: false,
        bet: 10,
        cards: [
          { rank: 'ace', suit: 'hearts' },
          { rank: 'two', suit: 'spades' }
        ]
      }
    ]
  } }); }, []);
  const removePlayer = useCallback(() => { dispatch({ type: 'removePlayer', id: players[players.length - 1].id }); }, [players]);

  return (
    <div className="menu">
      <button className="popup-button info-popup-button" aria-label="Information" onClick={openInfoPopup}></button>
      <button className="popup-button profile-popup-button" aria-label="Profile" onClick={openProfilePopup}></button>
      <button className="popup-button chat-popup-button" aria-label="Chat" onClick={openChatPopup}></button>
      <button className="popup-button music-popup-button" aria-label="Music" onClick={openMusicPopup}></button>
      <button className="popup-button settings-popup-button" aria-label="Settings" onClick={openSettingsPopup}></button>
      <button className="popup-button quit-popup-button" aria-label="Quit" onClick={openQuitPopup}></button>
      <button className="popup-button dev-popup-button" aria-label="Dev" title="dealCardToDealer" onClick={dealCardToDealer}></button>
      <button className="popup-button dev-popup-button" aria-label="Dev" title="dealCardToPlayer" onClick={dealCardToPlayer}></button>
      <button className="popup-button dev-popup-button" aria-label="Dev" title="sweepCardsFromDealer" onClick={sweepCardsFromDealer}></button>
      <button className="popup-button dev-popup-button" aria-label="Dev" title="sweepCardsFromPlayer" onClick={sweepCardsFromPlayer}></button>
      <button className="popup-button dev-popup-button" aria-label="Dev" title="flipHoleCard" onClick={flipHoleCard}></button>
      <button className="popup-button dev-popup-button" aria-label="Dev" title="addPlayer" onClick={addPlayer}></button>
      <button className="popup-button dev-popup-button" aria-label="Dev" title="removePlayer" onClick={removePlayer}></button>
    </div>
  );
};

// Menu.propTypes = {
//   foo: PropTypes.bool.isRequired
// };

export default Menu;
