import React from 'react';
import PropTypes from 'prop-types';
import { useStateContext } from '../context.jsx';
import { formatMoney, getHandTotal } from '../utils.js';

const Banner = (props) => {
  console.log('Banner render', props);

  const { dealer, players, messages } = useStateContext();
  //const brTagCallback = (previous, current) => [previous, <br />, current];
  const primaryPlayer = players.find((p) => p.primary);
  const primaryPlayerChips = formatMoney(primaryPlayer.chips);
  const primaryPlayerBet = primaryPlayer.hands.map((h) => formatMoney(h.bet));//.reduce(brTagCallback);
  const primaryPlayerName = primaryPlayer.name;
  const primaryPlayerHandTotal = primaryPlayer.hands.map((h) => getHandTotal(h));//.reduce(brTagCallback);
  const dealerName = dealer.name;
  const dealerHandTotal = getHandTotal(dealer.hand);
  const message = messages;//.reduce(brTagCallback);

  return (
    <div class='banner'>
      <div>
        <div class='primary-player-chips'>
          <p>Chips</p>
          <p>{primaryPlayerChips}</p>
        </div>
        <div class='primary-player-bet'>
          <p>Bet</p>
          <p>{primaryPlayerBet}</p>
        </div>
      </div>
      <div>
        <div class='message'>
          <p>{message}</p>
        </div>
      </div>
      <div>
        <div class='primary-player-hand-total'>
          <p>{primaryPlayerName}</p>
          <p>{primaryPlayerHandTotal}</p>
        </div>
        <div class='dealer-hand-total'>
          <p>{dealerName}</p>
          <p>{dealerHandTotal}</p>
        </div>
      </div>
    </div>
  );
};

// Banner.propTypes = {
//   foo: PropTypes.bool.isRequired
// };

export default Banner;
