import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { useIsMounted } from '../hooks.js';

const FLIP_TIMEOUT_MS = 750;

const Card = React.forwardRef((props, ref) => {
  console.log('Card render', props);

  const { rank, suit, hidden } = props.card;
  const isMounted = useIsMounted();

  useLayoutEffect(() => {
    let timeout;
    let node = ref.current;

    if (isMounted) {
      if (hidden) {
        console.log('visible => hidden', `${rank}-of-${suit}`);
      } else {
        //node.classList.add(`${rank}-of-${suit}`, 'hidden', 'flip');
        //timeout = setTimeout(() => { node.classList.remove('hidden', 'flip'); }, FLIP_TIMEOUT_MS);
      }
    }

    return () => clearTimeout(timeout);
  }, [isMounted, rank, suit, hidden])

  return <div ref={ref} className={`card ${hidden ? 'hidden' : `${rank}-of-${suit}`}`} />
});

Card.propTypes = {
  card: PropTypes.object.isRequired
};

export default Card;
