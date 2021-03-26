import React, { Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { useStateContext } from '../hooks.js';
import { formatMoney, getHandTotal } from '../utils.js';

const timeouts = {
  enter: 1000,
  exit: 1000
}

const Banner = (props) => {
  console.log('Banner render', props);

  const leftContainerRef = useRef(null);
  const rightContainerRef = useRef(null);
  const { dealer, players, message } = useStateContext();
  const primaryPlayer = players.find((player) => player.primary);

  return (
    <div className="banner">
      <SwitchTransition>
        <CSSTransition key={!!primaryPlayer} nodeRef={leftContainerRef} timeout={timeouts}>
          <Fragment>
            {primaryPlayer && (
              <div ref={leftContainerRef} className="banner-left-container">
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
            )}
          </Fragment>
        </CSSTransition>
      </SwitchTransition>
      <div className="banner-middle-container">
        <div className="message">
          <p>
            {message.map((line, index) => (
              <span key={index}>{line}</span>
            ))}
          </p>
        </div>
      </div>
      <SwitchTransition>
        <CSSTransition key={!!primaryPlayer} nodeRef={rightContainerRef} timeout={timeouts}>
          <Fragment>
            {primaryPlayer && (
              <div ref={rightContainerRef} className="banner-right-container">
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
            )}
          </Fragment>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

// Banner.propTypes = {
//   foo: PropTypes.bool.isRequired
// };

export default Banner;
