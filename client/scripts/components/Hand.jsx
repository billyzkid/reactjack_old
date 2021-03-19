import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card.jsx';

const Hand = (props) => {
  console.log('Hand render', props);

  return (
    <div className="hand">
      {props.hand.cards.map((card, index) => (
        <Card key={index} card={card} />
      ))}
    </div>
  );
};

Hand.propTypes = {
  hand: PropTypes.object.isRequired
};

export default Hand;
