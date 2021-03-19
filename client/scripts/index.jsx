import React from 'react';
import ReactDOM from 'react-dom';
import { ContextProvider } from './components/Context.jsx';
import App from './components/App.jsx';
import '../styles/index.scss';

const state = {
  isInfoModalOpen: false,
  isProfileModalOpen: false,
  isChatModalOpen: false,
  isMusicModalOpen: false,
  isSettingsModalOpen: false,
  isQuitModalOpen: false,
  dealer: {
    name: 'Dealer',
    hand: {
      cards: [
        { rank: 'ace', suit: 'hearts' },
        { rank: '?', suit: '?' }
      ]
    }
  },
  players: [
    {
      name: 'Will',
      primary: true,
      active: false,
      chips: 1000,
      hands: [
        {
          bet: 10,
          cards: [
            { rank: 'ace', suit: 'hearts' },
            { rank: 'two', suit: 'spades' }
          ]
        },
        {
          bet: 20,
          cards: [
            { rank: 'ace', suit: 'hearts' },
            { rank: 'two', suit: 'spades' }
          ]
        },
        {
          bet: 30,
          cards: [
            { rank: 'ace', suit: 'hearts' },
            { rank: 'two', suit: 'spades' }
          ]
        }
      ]
    }
  ],
  messages: ['This is a message.', 'This is a longer message.']
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'toggleInfoModal':
      return { ...state, isInfoModalOpen: action.isOpen };
    case 'toggleProfileModal':
      return { ...state, isProfileModalOpen: action.isOpen };
    case 'toggleChatModal':
      return { ...state, isChatModalOpen: action.isOpen };
    case 'toggleMusicModal':
      return { ...state, isMusicModalOpen: action.isOpen };
    case 'toggleSettingsModal':
      return { ...state, isSettingsModalOpen: action.isOpen };
    case 'toggleQuitModal':
      return { ...state, isQuitModalOpen: action.isOpen };
    case 'addPlayer':
      return { ...state, players: state.players.concat(action.player) };
    case 'removePlayer':
      return { ...state, players: state.players.filter((player) => player.id !== action.id) };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider state={state} reducer={reducer}>
      <App />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
