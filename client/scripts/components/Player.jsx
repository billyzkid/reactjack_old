import React, { forwardRef, createRef } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Hand from './Hand.jsx';
import { getClassNames, getHandPositions, getHandTotal, formatMoney } from '../utils.js';

const timeouts = {
  enter: 200,
  exit: 200
};

const Player = forwardRef((props, ref) => {
  console.log('Player render', props);

  const { player, position } = props;
  const { name, primary, active, chips, hands } = player;
  const handPositions = getHandPositions(hands);

  const classNames = getClassNames({
    player: true,
    primary: primary,
    active: active,
    [`position-${position}`]: true
  });

  return (
    <div ref={ref} className={classNames}>
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
      <TransitionGroup className="hands">
        {hands.map((hand, index) => {
          const handRef = createRef(null); // avoids findDOMNode warning
          const handPosition = handPositions[index];
          return (
            <CSSTransition key={index} nodeRef={handRef} timeout={timeouts}>
              <Hand ref={handRef} hand={hand} position={handPosition} />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
});

Player.propTypes = {
  player: PropTypes.object.isRequired
};

export default Player;
