import React from 'react';
import PropTypes from 'prop-types';
import Table from './Table.jsx';

const App = (props) => {
  console.log('App render', props);

  return (
    <div id='app'>
      <Table />
    </div>
  );
};

// App.propTypes = {
//   foo: PropTypes.bool.isRequired
// };

export default App;
