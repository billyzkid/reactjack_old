import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useStateContext, useDispatchContext } from '../hooks.js';

const DebugMenu = (props) => {
  console.log('DebugMenu render', props);

  const { players } = useStateContext();
  const dispatch = useDispatchContext();

  const dealCardToDealer = useCallback(() => { dispatch({ type: 'dealCardToDealer', card: { rank: 'ace', suit: 'spades' } }); }, []);
  const dealCardToPlayer = useCallback(() => { dispatch({ type: 'dealCardToPlayer', playerId: players[players.length - 1].id, handIndex: players[players.length - 1].hands.length - 1, card: { rank: 'ace', suit: 'spades' } }); }, [players]);
  const sweepDealerHand = useCallback(() => { dispatch({ type: 'sweepDealerHand' }); }, []);
  const sweepPlayerHand = useCallback(() => { dispatch({ type: 'sweepPlayerHand', playerId: players[players.length - 1].id, handIndex: players[players.length - 1].hands.length - 1 }); }, [players]);
  const flipHoleCard = useCallback(() => { dispatch({ type: 'flipHoleCard' }); }, []);
  const addPlayer = useCallback(() => { dispatch({ type: 'addPlayer', player: { id: Date.now() + Math.random(), name: 'Avery', primary: false, active: false, chips: 1000, hands: [] } }); }, []);
  const addPrimaryPlayer = useCallback(() => { dispatch({ type: 'addPlayer', player: { id: Date.now() + Math.random(), name: 'Avery', primary: true, active: false, chips: 1000, hands: [] } }); }, []);
  const removePlayer = useCallback(() => { dispatch({ type: 'removePlayer', playerId: players[players.length - 1].id }); }, [players]);
  const addPlayerHand = useCallback(() => { dispatch({ type: 'addPlayerHand', playerId: players[players.length - 1].id, hand: { active: false, bet: 10, cards: [{ rank: 'ace', suit: 'hearts' }, { rank: 'two', suit: 'spades' }] }}); }, [players]);
  const removePlayerHand = useCallback(() => { dispatch({ type: 'removePlayerHand', playerId: players[players.length - 1].id, handIndex: players[players.length - 1].hands.length - 1 }); }, [players]);
  const showMessage = useCallback(() => { dispatch({ type: 'showMessage', message: ['Line one.', 'Line two.'] }); }, []);
  const hideMessage = useCallback(() => { dispatch({ type: 'hideMessage' }); }, []);

  return (
    <div className="debug-menu">
      <button onClick={dealCardToDealer}>dealCardToDealer</button>
      <button onClick={dealCardToPlayer}>dealCardToPlayer</button>
      <button onClick={sweepDealerHand}>sweepDealerHand</button>
      <button onClick={sweepPlayerHand}>sweepPlayerHand</button>
      <button onClick={flipHoleCard}>flipHoleCard</button>
      <button onClick={addPlayer}>addPlayer</button>
      <button onClick={addPrimaryPlayer}>addPrimaryPlayer</button>
      <button onClick={removePlayer}>removePlayer</button>
      <button onClick={addPlayerHand}>addPlayerHand</button>
      <button onClick={removePlayerHand}>removePlayerHand</button>
      <button onClick={showMessage}>showMessage</button>
      <button onClick={hideMessage}>hideMessage</button>
    </div>
  );
};

// DebugMenu.propTypes = {
//   foo: PropTypes.bool.isRequired
// };

export default DebugMenu;
