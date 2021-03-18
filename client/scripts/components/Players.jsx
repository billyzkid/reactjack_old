import React from 'react';
import PropTypes from 'prop-types';
import { useStateContext } from '../hooks.js';
import Player from './Player.jsx';

const Players = (props) => {
  console.log('Players render', props);

  const { players } = useStateContext();

  return (
    <div className='players'>
      {players.map((player, index) =>
        <Player key={index} player={player} />
      )}
    </div>
  );
};

// Players.propTypes = {
//   foo: PropTypes.bool.isRequired
// };

export default Players;
