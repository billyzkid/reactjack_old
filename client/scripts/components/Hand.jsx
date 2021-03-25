import React, { forwardRef, createRef } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Card from './Card.jsx';
import { getClassNames } from '../utils.js';

const timeouts = {
  enter: 1000,
  exit: 1000
};

const Hand = forwardRef((props, ref) => {
  console.log('Hand render', props);

  const { hand } = props;
  const { active, cards, style } = hand;

  const classNames = getClassNames({
    hand: true,
    active: active
  });

  return (
    <div ref={ref} className={classNames} style={style}>
      <TransitionGroup component={null}>
        {cards.map((card, index) => {
          const cardRef = createRef(null); // avoids findDOMNode warning
          return (
            <CSSTransition key={index} nodeRef={cardRef} timeout={timeouts}>
              <Card ref={cardRef} card={card} />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
});

Hand.propTypes = {
  hand: PropTypes.object.isRequired
};

export default Hand;
