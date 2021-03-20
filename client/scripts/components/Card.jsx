import React from 'react';
import PropTypes from 'prop-types';

const Card = React.forwardRef((props, ref) => {
  console.log('Card render', props);

  const { rank, suit, hidden } = props.card;

  return <div ref={ref} className={`card ${hidden ? 'hidden' : `${rank}-of-${suit}`}`} />;
});

Card.propTypes = {
  card: PropTypes.object.isRequired
};

export default Card;
