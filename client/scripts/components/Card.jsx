import React from 'react';
import PropTypes from 'prop-types';

const Card = React.forwardRef((props, ref) => {
  console.log('Card render', props);

  const { rank, suit } = props.card;

  let classNames;

  if (rank === '?' || suit === '?') {
    classNames = 'card hidden';
  } else {
    classNames = `card ${rank}-of-${suit}`;
  }

  return <div ref={ref} className={classNames} />;
});

Card.propTypes = {
  card: PropTypes.object.isRequired
};

export default Card;
