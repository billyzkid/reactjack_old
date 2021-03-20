import React from 'react';
import PropTypes from 'prop-types';

const Card = React.forwardRef((props, ref) => {
  console.log('Card render', props);

  const { rank, suit, hidden, flip } = props.card;

  let classNames;

  if (hidden && flip) {
    classNames = `card ${rank}-of-${suit} hidden flip`;
  } else if (!hidden && flip) {
    classNames = `card ${rank}-of-${suit} flip`;
  } else if (!hidden && !flip) {
    classNames = `card ${rank}-of-${suit}`;
  } else if (hidden && !flip) {
    classNames = 'card hidden';
  }

  return <div ref={ref} className={classNames} />
});

Card.propTypes = {
  card: PropTypes.object.isRequired
};

export default Card;
