import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Table from './Table.jsx';
import Menu from './Menu.jsx';
import Popups from './Popups.jsx';
import Popup from './Popup.jsx';
import { useDispatchContext } from '../hooks.js';

Popup.ariaHiddenSelector = '.app';

const App = (props) => {
  console.log('App render', props);

  const dispatch = useDispatchContext();

  useEffect(() => {
    dispatch({ type: 'dealCardToDealer', card: { rank: 'ace', suit: 'hearts', hidden: false } });
    //const timeout = setTimeout(() => dispatch({ type: 'dealCardToDealer', card: { rank: 'five', suit: 'clubs', hidden: true } }), 500);

    //return () => clearTimeout(timeout);
  }, []);

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
