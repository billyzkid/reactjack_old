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
  const dealCardToPlayer = useCallback(() => { dispatch({ type: 'dealCardToPlayer', playerId: players[players.length - 1].id, handIndex: players[players.length - 1].hands.length - 1, card: { rank: 'ace', suit: 'spades' } }); }, [players]);
  const sweepDealerHand = useCallback(() => { dispatch({ type: 'sweepDealerHand' }); }, []);
  const sweepPlayerHand = useCallback(() => { dispatch({ type: 'sweepPlayerHand', playerId: players[players.length - 1].id, handIndex: players[players.length - 1].hands.length - 1 }); }, [players]);
  const flipHoleCard = useCallback(() => { dispatch({ type: 'flipHoleCard' }); }, []);
  const addPlayer = useCallback(() => { dispatch({ type: 'addPlayer', player: { id: Date.now() + Math.random(), name: 'Avery', primary: false, active: false, chips: 1000, hands: [] } }); }, []);
  const removePlayer = useCallback(() => { dispatch({ type: 'removePlayer', playerId: players[players.length - 1].id }); }, [players]);
  const addPlayerHand = useCallback(() => { dispatch({ type: 'addPlayerHand', playerId: players[players.length - 1].id, hand: { active: false, bet: 10, cards: [{ rank: 'ace', suit: 'hearts' }, { rank: 'two', suit: 'spades' }] }}); }, [players]);
  const removePlayerHand = useCallback(() => { dispatch({ type: 'removePlayerHand', playerId: players[players.length - 1].id, handIndex: players[players.length - 1].hands.length - 1 }); }, [players]);

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
      <button className="popup-button dev-popup-button" aria-label="Dev" title="sweepDealerHand" onClick={sweepDealerHand}></button>
      <button className="popup-button dev-popup-button" aria-label="Dev" title="sweepPlayerHand" onClick={sweepPlayerHand}></button>
      <button className="popup-button dev-popup-button" aria-label="Dev" title="flipHoleCard" onClick={flipHoleCard}></button>
      <button className="popup-button dev-popup-button" aria-label="Dev" title="addPlayer" onClick={addPlayer}></button>
      <button className="popup-button dev-popup-button" aria-label="Dev" title="removePlayer" onClick={removePlayer}></button>
      <button className="popup-button dev-popup-button" aria-label="Dev" title="addPlayerHand" onClick={addPlayerHand}></button>
      <button className="popup-button dev-popup-button" aria-label="Dev" title="removePlayerHand" onClick={removePlayerHand}></button>
    </div>
  );
};

// Menu.propTypes = {
//   foo: PropTypes.bool.isRequired
// };

export default Menu;
