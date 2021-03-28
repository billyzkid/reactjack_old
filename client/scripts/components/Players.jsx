import React, { createRef } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useStateContext } from '../hooks.js';
import { getPlayerPositions } from '../utils.js';
import Player from './Player.jsx';

const timeouts = {
  enter: 500,
  exit: 200
};

const Players = (props) => {
  console.log('Players render', props);

  const { players } = useStateContext();
  const positions = getPlayerPositions(players);

  return (
    <TransitionGroup className="players">
      {players.map((player) => {
        const playerRef = createRef(null); // avoids findDOMNode warning
        const position = positions.indexOf(player) + 1;
        return (
          <CSSTransition key={player.id} nodeRef={playerRef} timeout={timeouts}>
            <Player ref={playerRef} player={player} position={position} />
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
};

export default Players;
