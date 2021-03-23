import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useStateContext } from '../hooks.js';
import Player from './Player.jsx';

const timeouts = {
  enter: 1000,
  exit: 1000
};

const Players = (props) => {
  console.log('Players render', props);

  const { players } = useStateContext();
  const seatedPlayers = sitPlayers(players);

  return (
    <TransitionGroup className="players">
      {seatedPlayers.map((player, index) => {
        const playerRef = createRef(null); // avoids findDOMNode warning
        return (
          <CSSTransition key={player.id} nodeRef={playerRef} timeout={timeouts}>
            <Player ref={playerRef} player={player} />
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
};

// Players.propTypes = {
//   foo: PropTypes.bool.isRequired
// };

const dummyPlayer = { id: Date.now() + Math.random(), dummy: true };

function sitPlayers(players) {
  const seatedPlayers = [];
  const primaryPlayer = players.find((player) => player.primary);

  if (primaryPlayer) {
    const otherPlayers = players.filter((player) => player !== primaryPlayer);

    if (otherPlayers.length === 0) {
      seatedPlayers.push(primaryPlayer);
    } else if (otherPlayers.length === 1) {
      seatedPlayers.push(otherPlayers[0], primaryPlayer, dummyPlayer);
    } else if (otherPlayers.length === 2) {
      seatedPlayers.push(otherPlayers[0], primaryPlayer, otherPlayers[1]);
    } else if (otherPlayers.length === 3) {
      seatedPlayers.push(otherPlayers[2], otherPlayers[0], primaryPlayer, otherPlayers[1], dummyPlayer);
    } else if (otherPlayers.length === 4) {
      seatedPlayers.push(otherPlayers[2], otherPlayers[0], primaryPlayer, otherPlayers[1], otherPlayers[3]);
    } else {
      throw new Error('table seating is limited to 5 players');
    }
  } else {
    if (players.length === 0) {
      console.warn('no players to seat');
    } else if (players.length === 1) {
      seatedPlayers.push(players[0]);
    } else if (players.length === 2) {
      seatedPlayers.push(players[1], players[0], dummyPlayer);
    } else if (players.length === 3) {
      seatedPlayers.push(players[1], players[0], players[2]);
    } else if (players.length === 4) {
      seatedPlayers.push(players[3], players[1], players[0], players[2], dummyPlayer);
    } else if (players.length === 5) {
      seatedPlayers.push(players[3], players[1], players[0], players[2], players[4]);
    } else {
      throw new Error('table seating is limited to 5 players');
    }
  }

  return seatedPlayers;
}

export default Players;
