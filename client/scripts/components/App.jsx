import React from 'react';
import PropTypes from 'prop-types';
import Table from './Table.jsx';
import Menu from './Menu.jsx';
import Popups from './Popups.jsx';
import Popup from './Popup.jsx';

Popup.ariaHiddenSelector = '.app';

const App = (props) => {
  console.log('App render', props);

  return (
    <div className="app">
      <Table />
      <Menu />
      <Popups />
    </div>
  );
};

// App.propTypes = {
//   foo: PropTypes.bool.isRequired
// };

export default App;
