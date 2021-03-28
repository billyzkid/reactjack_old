import React, { useEffect } from 'react';
import Table from './Table.jsx';
import DebugMenu from './DebugMenu.jsx';
import MainMenu from './MainMenu.jsx';
import { InfoPopup, ProfilePopup, ChatPopup, MusicPopup, SettingsPopup, QuitPopup } from './Popups.jsx';
import { useDispatchContext } from '../hooks.js';

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
      hands: [
        { active: true, bet: 10, cards: [{ rank: 'ace', suit: 'hearts' }, { rank: 'two', suit: 'spades' }] },
        { active: false, bet: 10, cards: [{ rank: 'ace', suit: 'hearts' }, { rank: 'two', suit: 'spades' }] }
      ]
    }});

    dispatch({ type: 'addPlayer', player: {
      id: 101,
      name: 'Lisa',
      primary: false,
      active: true,
      chips: 1000,
      hands: [
        { active: false, bet: 10, cards: [{ rank: 'ace', suit: 'hearts' }, { rank: 'two', suit: 'spades' }] }
      ]
    }});

    dispatch({ type: 'addPlayer', player: {
      id: 102,
      name: 'Tyler',
      primary: false,
      active: false,
      chips: 1000,
      hands: [
        { active: false, bet: 10, cards: [{ rank: 'ace', suit: 'hearts' }, { rank: 'two', suit: 'spades' }] }
      ]
    }});

    dispatch({ type: 'addPlayer', player: {
      id: 103,
      name: 'Dan',
      primary: false,
      active: false,
      chips: 1000,
      hands: [
        { active: false, bet: 10, cards: [{ rank: 'ace', suit: 'hearts' }, { rank: 'two', suit: 'spades' }] }
      ]
    }});

    dispatch({ type: 'addPlayer', player: {
      id: 104,
      name: 'Avery',
      primary: false,
      active: false,
      chips: 1000,
      hands: [
        { active: false, bet: 10, cards: [{ rank: 'ace', suit: 'hearts' }, { rank: 'two', suit: 'spades' }] }
      ]
    }});

    // deal up card to the dealer
    dispatch({ type: 'dealCardToDealer', card: { rank: 'ace', suit: 'hearts', hidden: false } });

    // wait and then deal hole card to the dealer
    const timeoutId = setTimeout(() => dispatch({ type: 'dealCardToDealer', card: { rank: 'five', suit: 'clubs', hidden: true } }), 500);

    return () => {
      clearTimeout(timeoutId);
      dispatch({ type: 'reset' });
    };
  }, []);

  return (
    <div className="app">
      <Table />
      <DebugMenu />
      <MainMenu />
      <InfoPopup />
      <ProfilePopup />
      <ChatPopup />
      <MusicPopup />
      <SettingsPopup />
      <QuitPopup />
    </div>
  );
};

export default App;
