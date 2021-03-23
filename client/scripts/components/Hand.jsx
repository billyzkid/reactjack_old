import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Card from './Card.jsx';
import { getClassNames } from '../utils.js';

const timeouts = {
  enter: 1000,
  exit: 1000
};

const Hand = (props) => {
  console.log('Hand render', props);

  const { hand } = props;
  const { active, cards } = hand;

  const classNames = getClassNames({
    'hand': true,
    'active': active
  });

  return (
    <TransitionGroup className={classNames}>
      {cards.map((card, index) => {
        const cardRef = createRef(null); // avoids findDOMNode warning
        return (
          <CSSTransition key={index} nodeRef={cardRef} timeout={timeouts}>
            <Card ref={cardRef} card={card} />
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
};

Hand.propTypes = {
  hand: PropTypes.object.isRequired
};

export default Hand;
