import React, { createElement } from 'react';
import PropTypes from 'prop-types';

const FLIP_TIMEOUT_MS = 750;

const Card = React.forwardRef((props, ref) => {
  console.log('Card render', props);

  const { rank, suit, hidden, flip } = props.card;

  let classNames;

  if (hidden && flip) {
    classNames = `card ${rank}-of-${suit} hidden flip`;
    setTimeout(() => ref.current.classList.remove('hidden', 'flip'), FLIP_TIMEOUT_MS);
  } else if (!hidden && flip) {
    classNames = `card ${rank}-of-${suit} flip`;
    setTimeout(() => { ref.current.classList.add('hidden'); ref.current.classList.remove(`${rank}-of-${suit}`, 'flip'); }, FLIP_TIMEOUT_MS);
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
