import React from 'react';
import PropTypes from 'prop-types';
import Dealer from './Dealer.jsx';
import Banner from './Banner.jsx';
import Controls from './Controls.jsx';
import Players from './Players.jsx';

const Table = (props) => {
  console.log('Table render', props);

  return (
    <div id='table'>
      <h1>Reactjack</h1>
      {/* <Dealer /> */}
      {/* <Banner /> */}
      {/* <Controls /> */}
      <Players />
    </div>
  );
};

// Table.propTypes = {
//   foo: PropTypes.bool.isRequired
// };

export default Table;
