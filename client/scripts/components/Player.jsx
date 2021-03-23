import React from 'react';
import PropTypes from 'prop-types';
import Hand from './Hand.jsx';
import { getClassNames, getHandTotal, formatMoney } from '../utils.js';

const Player = (props) => {
  console.log('Player render', props);

  const { player } = props;
  const { name, primary, active, chips, hands } = player;

  const classNames = getClassNames({
    'player': true,
    'primary': primary,
    'active': active
  });

  return (
    <div className={classNames}>
      <div className="info">
        <p className="player-name">{name}</p>
        <div>
          <p className="player-chips">{formatMoney(chips)}</p>
          <p className="player-bet">
            {hands.map((hand, index) => (
              <span key={index}>{formatMoney(hand.bet)}</span>
            ))}
          </p>
          <p className="player-hand-total">
            {hands.map((hand, index) => (
              <span key={index}>{getHandTotal(hand)}</span>
            ))}
          </p>
        </div>
      </div>
      <div className="hands">
        {hands.map((hand, index) => (
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
