import React, { forwardRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { useIsMounted } from '../hooks.js';

const FLIP_TIMEOUT_MS = 750;

const Card = forwardRef((props, ref) => {
  console.log('Card render', props);

  const { rank, suit, hidden } = props.card;
  const isMounted = useIsMounted();

  useLayoutEffect(() => {
    let timeout;
    let node = ref.current;

    console.log('here');

    if (isMounted) {
      if (hidden) {
        node.className = `card ${rank}-of-${suit} flip`;
        timeout = setTimeout(() => { node.className = 'card hidden' }, FLIP_TIMEOUT_MS);
      } else {
        node.className = `card ${rank}-of-${suit} hidden flip`;
        timeout = setTimeout(() => { node.className = `card ${rank}-of-${suit}` }, FLIP_TIMEOUT_MS);
      }
    }

    return () => clearTimeout(timeout);
  }, [hidden])

  return <div ref={ref} className={`card ${hidden ? 'hidden' : `${rank}-of-${suit}`}`} />
});

Card.propTypes = {
  card: PropTypes.object.isRequired
};

export default Card;
