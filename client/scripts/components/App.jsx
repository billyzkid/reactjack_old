import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Table from './Table.jsx';
import MainMenu from './MainMenu.jsx';
import DebugMenu from './DebugMenu.jsx';
import Popups from './Popups.jsx';
import Popup from './Popup.jsx';
import { useDispatchContext } from '../hooks.js';

Popup.ariaHiddenSelector = '.app';

const App = (props) => {
  console.log('App render', props);

  const dispatch = useDispatchContext();

  useEffect(() => {

    // show message
    dispatch({ type: 'showMessage', message: [
      'This is the first line of the message.',
      'This is the second line of the message.'
    ]});

    // add players
    dispatch({ type: 'addPlayer', player: {
      id: 100,
      name: 'Will',
      primary: true,
      active: false,
      chips: 1000,
      hands: []
    }});

    dispatch({ type: 'addPlayer', player: {
      id: 101,
      name: 'Lisa',
      primary: false,
      active: true,
      chips: 1000,
      hands: []
    }});

    dispatch({ type: 'addPlayer', player: {
      id: 102,
      name: 'Tyler',
      primary: false,
      active: false,
      chips: 1000,
      hands: []
    }});

    dispatch({ type: 'addPlayer', player: {
      id: 103,
      name: 'Dan',
      primary: false,
      active: false,
      chips: 1000,
      hands: []
    }});

    dispatch({ type: 'addPlayer', player: {
      id: 104,
      name: 'Avery',
      primary: false,
      active: false,
      chips: 1000,
      hands: []
    }});

    // deal up card to the dealer
    dispatch({ type: 'dealCardToDealer', card: { rank: 'ace', suit: 'hearts', hidden: false } });

    // deal hole card to the dealer
    const timeoutId = setTimeout(() => dispatch({ type: 'dealCardToDealer', card: { rank: 'five', suit: 'clubs', hidden: true } }), 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="app">
      <Table />
      <MainMenu />
      <DebugMenu />
      <Popups />
    </div>
  );
};

// App.propTypes = {
//   foo: PropTypes.bool.isRequired
// };

export default App;
