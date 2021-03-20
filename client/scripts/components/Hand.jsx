import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Card from './Card.jsx';

const Hand = (props) => {
  console.log('Hand render', props);

  return (
    <TransitionGroup className='hand'>
      {props.hand.cards.map((card, index) => (
        <CSSTransition key={index} timeout={2500}>
          <Card card={card} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

Hand.propTypes = {
  hand: PropTypes.object.isRequired
};

export default Hand;
