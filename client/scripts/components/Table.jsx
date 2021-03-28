import React from 'react';
import Dealer from './Dealer.jsx';
import Banner from './Banner.jsx';
import Controls from './Controls.jsx';
import Players from './Players.jsx';

const Table = (props) => {
  console.log('Table render', props);

  return (
    <div className="table">
      <h1>Reactjack</h1>
      <Dealer />
      <Banner />
      <Controls />
      <Players />
    </div>
  );
};

export default Table;
