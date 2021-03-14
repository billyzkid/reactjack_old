import React from 'react';
import PropTypes from 'prop-types';

const Card = (props) => {
  console.log('Card render', props);

  const { rank, suit } = props.card;

  let className;

  if (rank === '?' || suit === '?') {
    className = 'card hidden';
  } else {
    className = `card ${rank}-of-${suit}`;
  }

  return (
    <div className={className} />
  );
};

Card.propTypes = {
  card: PropTypes.object.isRequired
};

export default Card;
