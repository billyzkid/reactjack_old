import React from 'react';
import PropTypes from 'prop-types';
import Hand from './Hand.jsx';
import { formatMoney, getHandTotal } from '../utils.js';

const Player = (props) => {
  console.log('Player render', props);

  return (
    <div class='player'>
      <div class='info'>
        <span>{props.player.name}</span>
        <span>{formatMoney(props.player.chips)}</span>
        <span>
          {props.player.hands.map((hand, index) => (
            <p key={index}>{formatMoney(hand.bet)}</p>
          ))}
        </span>
        <span>
          {props.player.hands.map((hand, index) => (
            <p key={index}>{getHandTotal(hand)}</p>
          ))}
        </span>
      </div>
      <div class='hands'>
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
