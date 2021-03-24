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

  sitPlayers(players);

  return (
    <TransitionGroup className="players">
      {players.map((player, index) => {
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

function sitPlayers(players) {
  const primaryPlayer = players.find((player) => player.primary);

  if (primaryPlayer) {
    const otherPlayers = players.filter((player) => player !== primaryPlayer);

    switch (otherPlayers.length) {
      case 0:
        primaryPlayer.style =   { 'grid-area': '1 / 3 / auto / auto' };
        break;

      case 1:
        primaryPlayer.style =   { 'grid-area': '1 / 3 / auto / auto' };
        otherPlayers[0].style = { 'grid-area': '1 / 1 / auto / auto' };
        break;

      case 2:
        primaryPlayer.style =   { 'grid-area': '1 / 3 / auto / auto' };
        otherPlayers[0].style = { 'grid-area': '1 / 1 / auto / auto' };
        otherPlayers[1].style = { 'grid-area': '1 / 2 / auto / auto' };
        break;

      case 3:
        primaryPlayer.style =   { 'grid-area': '1 / 3 / auto / auto' };
        otherPlayers[0].style = { 'grid-area': '1 / 1 / auto / auto' };
        otherPlayers[1].style = { 'grid-area': '1 / 2 / auto / auto' };
        otherPlayers[2].style = { 'grid-area': '1 / 4 / auto / auto' };
        break;

      case 4:
        primaryPlayer.style =   { 'grid-area': '1 / 3 / auto / auto' };
        otherPlayers[0].style = { 'grid-area': '1 / 1 / auto / auto' };
        otherPlayers[1].style = { 'grid-area': '1 / 2 / auto / auto' };
        otherPlayers[2].style = { 'grid-area': '1 / 4 / auto / auto' };
        otherPlayers[3].style = { 'grid-area': '1 / 5 / auto / auto' };
        break;

      default:
        throw new Error('Table can only seat a maximum of 5 players.');
    }
  } else {
    switch (players.length) {
      case 0:
        break;

      case 1:
        players[0].style = { 'grid-area': '1 / 1 / auto / auto' };
        break;

      case 2:
        players[0].style = { 'grid-area': '1 / 1 / auto / auto' };
        players[1].style = { 'grid-area': '1 / 2 / auto / auto' };
        break;

      case 3:
        players[0].style = { 'grid-area': '1 / 1 / auto / auto' };
        players[1].style = { 'grid-area': '1 / 2 / auto / auto' };
        players[2].style = { 'grid-area': '1 / 3 / auto / auto' };
        break;

      case 4:
        players[0].style = { 'grid-area': '1 / 1 / auto / auto' };
        players[1].style = { 'grid-area': '1 / 2 / auto / auto' };
        players[2].style = { 'grid-area': '1 / 3 / auto / auto' };
        players[3].style = { 'grid-area': '1 / 4 / auto / auto' };
        break;

      case 5:
        players[0].style = { 'grid-area': '1 / 1 / auto / auto' };
        players[1].style = { 'grid-area': '1 / 2 / auto / auto' };
        players[2].style = { 'grid-area': '1 / 3 / auto / auto' };
        players[3].style = { 'grid-area': '1 / 4 / auto / auto' };
        players[4].style = { 'grid-area': '1 / 5 / auto / auto' };
        break;

      default:
        throw new Error('Table can only seat a maximum of 5 players.');
    }
  }
}

export default Players;
