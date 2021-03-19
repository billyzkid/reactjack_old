import React from 'react';
import PropTypes from 'prop-types';
import Hand from './Hand.jsx';
import { formatMoney, getHandTotal } from '../utils.js';

const Player = (props) => {
  console.log('Player render', props);

  return (
    <div className='player'>
      <div className='info'>
        <p>{props.player.name}</p>
        <p>{formatMoney(props.player.chips)}</p>
        <p>
          {props.player.hands.map((hand, index) => (
            <span key={index}>{formatMoney(hand.bet)}</span>
          ))}
        </p>
        <p>
          {props.player.hands.map((hand, index) => (
            <span key={index}>{getHandTotal(hand)}</span>
          ))}
        </p>
      </div>
      <div className='hands'>
        {props.player.hands.map((hand, index) => (
          <Hand key={index} hand={hand} />
        ))}
      </div>
    </div>
  );
};

Player.propTypes = {
  player: PropTypes.object.isRequired
};

export default Player;
