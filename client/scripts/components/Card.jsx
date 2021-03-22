import React, { forwardRef, useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { useIsMounted } from '../hooks.js';

const FLIP_TIMEOUT_MS = 750;

const Card = forwardRef((props, ref) => {
  console.log('Card render', props);

  const { rank, suit, hidden } = props.card;
  const isMounted = useIsMounted();

  useLayoutEffect(() => {
    let timeoutId;

    if (isMounted) {
      if (hidden) {
        ref.current.className = `card ${rank}-of-${suit} flip`;
        timeoutId = setTimeout(() => ref.current.className = 'card hidden', FLIP_TIMEOUT_MS);
      } else {
        ref.current.className = `card hidden ${rank}-of-${suit} flip`;
        timeoutId = setTimeout(() => ref.current.className = `card ${rank}-of-${suit}`, FLIP_TIMEOUT_MS);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [hidden])

  return <div ref={ref} className={hidden ? 'card hidden' : `card ${rank}-of-${suit}`} />
});

Card.propTypes = {
  card: PropTypes.object.isRequired
};

export default Card;
