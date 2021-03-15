import React from 'react';
import PropTypes from 'prop-types';
import Table from './Table.jsx';
import Menu from './Menu.jsx';
import Modals from './Modals.jsx';

const App = (props) => {
  console.log('App render', props);

  return (
    <div class='app'>
      <Table />
      <Menu />
      <Modals />
    </div>
  );
};

// App.propTypes = {
//   foo: PropTypes.bool.isRequired
// };

export default App;
