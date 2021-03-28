import React from 'react';
import { useStateContext } from '../hooks.js';
import Hand from './Hand.jsx';

const Dealer = (props) => {
  console.log('Dealer render', props);

  const { dealer } = useStateContext();

  return (
    <div className="dealer">
      <Hand hand={dealer.hand} />
    </div>
  );
};

export default Dealer;
