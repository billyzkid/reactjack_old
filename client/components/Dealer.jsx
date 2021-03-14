import React from 'react';
import PropTypes from 'prop-types';
import { useStateContext } from './ContextProvider.jsx';
import Hand from './Hand.jsx';

const Dealer = (props) => {
  console.log('Dealer render', props);

  const { dealer } = useStateContext();

  return (
    <div id='dealer'>
      <Hand hand={dealer.hand} />
    </div>
  );
};

// Dealer.propTypes = {
//   foo: PropTypes.bool.isRequired
// };

export default Dealer;
