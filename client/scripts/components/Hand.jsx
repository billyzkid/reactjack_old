import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Card from './Card.jsx';

const timeouts = {
  enter: 1000,
  exit: 1000
};

const Hand = (props) => {
  console.log('Hand render', props);

  return (
    <TransitionGroup className="hand">
      {props.hand.cards.map((card, index) => {
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
