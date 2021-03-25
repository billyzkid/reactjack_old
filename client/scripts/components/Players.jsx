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

  return (
    <TransitionGroup className="players">
      {players.map((player) => {
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

export default Players;
