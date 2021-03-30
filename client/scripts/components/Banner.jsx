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

  const playerChipsRef = useRef(null);
  const playerBetRef = useRef(null);
  const messageRef = useRef(null);
  const playerHandTotalRef = useRef(null);
  const dealerHandTotalRef = useRef(null);

  const isPlayerChipsVisible = !!primaryPlayer;
  const isPlayerBetVisible = !!primaryPlayer && primaryPlayer.hands.length > 0;
  const isMessageVisible = message && message.length > 0;
  const isPlayerHandTotalVisible = !!primaryPlayer && primaryPlayer.hands.length > 0;
  const isDealerHandTotalVisible = dealer && dealer.hand.cards.length > 1 && !dealer.hand.cards[1].hidden;

  return (
    <div className="banner">
      <div>
        <div>
          <SwitchTransition>
            <CSSTransition key={isPlayerChipsVisible} nodeRef={playerChipsRef} timeout={timeouts}>
              <Fragment>
                {isPlayerChipsVisible && (
                  <div ref={playerChipsRef} className="player-chips">
                    <p>Chips</p>
                    <p>{formatMoney(primaryPlayer.chips)}</p>
                  </div>
                )}
              </Fragment>
            </CSSTransition>
          </SwitchTransition>
          <SwitchTransition>
            <CSSTransition key={isPlayerBetVisible} nodeRef={playerBetRef} timeout={timeouts}>
              <Fragment>
                {isPlayerBetVisible && (
                  <div ref={playerBetRef} className="player-bet">
                    <p>Bet</p>
                    <p>
                      {primaryPlayer.hands.map((hand, index) => (
                        <span key={index}>{formatMoney(hand.bet)}</span>
                      ))}
                    </p>
                  </div>
                )}
              </Fragment>
            </CSSTransition>
          </SwitchTransition>
        </div>
        <div>
          <SwitchTransition>
            <CSSTransition key={isMessageVisible} nodeRef={messageRef} timeout={timeouts}>
              <Fragment>
                {isMessageVisible && (
                  <div ref={messageRef} className="message">
                    <p>
                      {message.map((line, index) => (
                        <span key={index}>{line}</span>
                      ))}
                    </p>
                  </div>
                )}
              </Fragment>
            </CSSTransition>
          </SwitchTransition>
        </div>
        <div>
          <SwitchTransition>
            <CSSTransition key={isPlayerHandTotalVisible} nodeRef={playerHandTotalRef} timeout={timeouts}>
              <Fragment>
                {isPlayerHandTotalVisible && (
                  <div ref={playerHandTotalRef} className="player-hand-total">
                    <p>{primaryPlayer.name}</p>
                    <p>
                      {primaryPlayer.hands.map((hand, index) => (
                        <span key={index}>{getHandTotal(hand).displayTotal}</span>
                      ))}
                    </p>
                  </div>
                )}
              </Fragment>
            </CSSTransition>
          </SwitchTransition>
          <SwitchTransition>
            <CSSTransition key={isDealerHandTotalVisible} nodeRef={dealerHandTotalRef} timeout={timeouts}>
              <Fragment>
                {isDealerHandTotalVisible && (
                  <div ref={dealerHandTotalRef} className="dealer-hand-total">
                    <p>{dealer.name}</p>
                    <p>{getHandTotal(dealer.hand).displayTotal}</p>
                  </div>
                )}
              </Fragment>
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Banner;
