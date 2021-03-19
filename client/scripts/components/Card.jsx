import React from 'react';
import PropTypes from 'prop-types';

const Card = (props) => {
  console.log('Card render', props);

  const { rank, suit } = props.card;

  let classNames;

  if (rank === '?' || suit === '?') {
    classNames = 'card hidden';
  } else {
    classNames = `card ${rank}-of-${suit}`;
  }

  return <div className={classNames} />;
};

Card.propTypes = {
  card: PropTypes.object.isRequired
};

export default Card;
