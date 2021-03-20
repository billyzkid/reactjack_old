import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

const Card = React.forwardRef((props, ref) => {
  console.log('Card render', props);

  const { rank, suit, hidden, flip } = props.card;

  return (
    <CSSTransition nodeRef={ref} in={flip} classNames={{
      enter: 'hidden flip',
      enterActive: 'hidden flip-active',
      enterDone: 'flip-done',
     }} timeout={5000}>
      <div ref={ref} className={`card ${hidden ? 'hidden' : `${rank}-of-${suit}`}`} />
    </CSSTransition>
  );
});

Card.propTypes = {
  card: PropTypes.object.isRequired
};

export default Card;
