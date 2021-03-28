import React, { Fragment, useRef } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { useStateContext } from '../hooks.js';
import { formatMoney, getHandTotal } from '../utils.js';

const timeouts = {
  enter: 1000,
  exit: 1000
}

const Banner = (props) => {
  console.log('Banner render', props);

  const { message, dealer, players } = useStateContext();
  const primaryPlayer = players.find((player) => player.primary);

  const leftContainerRef = useRef(null);
  const rightContainerRef = useRef(null);
  const middleContainerRef = useRef(null);

  const leftContainerKey = !!primaryPlayer;
  const rightContainerKey = !!primaryPlayer;
  const middleContainerKey = message && message.length > 0;

  return (
    <div className="banner">
      <SwitchTransition>
        <CSSTransition key={leftContainerKey} nodeRef={leftContainerRef} timeout={timeouts}>
          <Fragment>
            {primaryPlayer && (
              <div ref={leftContainerRef} className="banner-left-container">
                <div className="player-chips">
                  <p>Chips</p>
                  <p>{formatMoney(primaryPlayer.chips)}</p>
                </div>
                <div className="player-bet">
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
      <SwitchTransition>
        <CSSTransition key={middleContainerKey} nodeRef={middleContainerRef} timeout={timeouts}>
          <Fragment>
            {message && message.length > 0 && (
              <div ref={middleContainerRef} className="banner-middle-container">
                <div className="message">
                  <p>
                    {message.map((line, index) => (
                      <span key={index}>{line}</span>
                    ))}
                  </p>
                </div>
              </div>
            )}
          </Fragment>
        </CSSTransition>
      </SwitchTransition>
      <SwitchTransition>
        <CSSTransition key={rightContainerKey} nodeRef={rightContainerRef} timeout={timeouts}>
          <Fragment>
            {primaryPlayer && (
              <div ref={rightContainerRef} className="banner-right-container">
                <div className="player-hand-total">
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

export default Banner;
