import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useStateContext } from '../hooks.js';
import Player from './Player.jsx';

const timeouts = {
  enter: 500,
  exit: 200
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
        primaryPlayer.style = { 'grid-column': '3' };
        break;

      case 1:
        primaryPlayer.style = { 'grid-column': '3' };
        otherPlayers[0].style = { 'grid-column': '1' };
        break;

      case 2:
        primaryPlayer.style = { 'grid-column': '3' };
        otherPlayers[0].style = { 'grid-column': '1' };
        otherPlayers[1].style = { 'grid-column': '2' };
        break;

      case 3:
        primaryPlayer.style = { 'grid-column': '3' };
        otherPlayers[0].style = { 'grid-column': '1' };
        otherPlayers[1].style = { 'grid-column': '2' };
        otherPlayers[2].style = { 'grid-column': '4' };
        break;

      case 4:
        primaryPlayer.style = { 'grid-column': '3' };
        otherPlayers[0].style = { 'grid-column': '1' };
        otherPlayers[1].style = { 'grid-column': '2' };
        otherPlayers[2].style = { 'grid-column': '4' };
        otherPlayers[3].style = { 'grid-column': '5' };
        break;

      default:
        throw new Error('Table can only seat a maximum of 5 players.');
    }
  } else {
    switch (players.length) {
      case 0:
        break;

      case 1:
        players[0].style = { 'grid-column': '1' };
        break;

      case 2:
        players[0].style = { 'grid-column': '1' };
        players[1].style = { 'grid-column': '2' };
        break;

      case 3:
        players[0].style = { 'grid-column': '1' };
        players[1].style = { 'grid-column': '2' };
        players[2].style = { 'grid-column': '3' };
        break;

      case 4:
        players[0].style = { 'grid-column': '1' };
        players[1].style = { 'grid-column': '2' };
        players[2].style = { 'grid-column': '3' };
        players[3].style = { 'grid-column': '4' };
        break;

      case 5:
        players[0].style = { 'grid-column': '1' };
        players[1].style = { 'grid-column': '2' };
        players[2].style = { 'grid-column': '3' };
        players[3].style = { 'grid-column': '4' };
        players[4].style = { 'grid-column': '5' };
        break;

      default:
        throw new Error('Table can only seat a maximum of 5 players.');
    }
  }
}

export default Players;
