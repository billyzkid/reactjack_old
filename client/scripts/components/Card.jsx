import React from 'react';
import PropTypes from 'prop-types';

const Card = (props) => {
  console.log('Card render', props);

  const { rank, suit } = props.card;

  let classes;

  if (rank === '?' || suit === '?') {
    classes = 'card hidden';
  } else {
    classes = `card ${rank}-of-${suit}`;
  }

  return (
    <div class={classes} />
  );
};

Card.propTypes = {
  card: PropTypes.object.isRequired
};

export default Card;
