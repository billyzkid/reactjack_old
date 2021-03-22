import React from 'react';
import PropTypes from 'prop-types';
import { useStateContext } from '../hooks.js';
import { formatMoney, getHandTotal } from '../utils.js';

const Banner = (props) => {
  console.log('Banner render', props);

  const { dealer, players, message } = useStateContext();
  const primaryPlayer = players.find((player) => player.primary);

  return (
    <div className="banner">
      <div>
        <div className="primary-player-chips">
          <p>Chips</p>
          <p>{formatMoney(primaryPlayer.chips)}</p>
        </div>
        <div className="primary-player-bet">
          <p>Bet</p>
          <p>
            {primaryPlayer.hands.map((hand, index) => (
              <span key={index}>{formatMoney(hand.bet)}</span>
            ))}
          </p>
        </div>
      </div>
      <div>
        <div className="message">
          <p>
            {message.map((line, index) => (
              <span key={index}>{line}</span>
            ))}
          </p>
        </div>
      </div>
      <div>
        <div className="primary-player-hand-total">
          <p>{primaryPlayer.name}</p>
          <p>
            {primaryPlayer.hands.map((hand, index) => (
              <span key={index}>{getHandTotal(hand)}</span>
            ))}
          </p>
        </div>
        <div className="dealer-hand-total">
          <p>{dealer.name}</p>
          <p>{getHandTotal(dealer.hand)}</p>
        </div>
      </div>
    </div>
  );
};

// Banner.propTypes = {
//   foo: PropTypes.bool.isRequired
// };

export default Banner;
