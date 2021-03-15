import React, { createContext, useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

const StateContext = createContext();
const DispatchContext = createContext();
const SocketContext = createContext();

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
      return { ...state, players: state.players.filter(p => p.id !== action.id) };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const ContextProvider = (props) => {
  console.log('ContextProvider render', props);

  const [state, dispatch] = useReducer(reducer, {
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
      { name: 'Will', primary: true, active: false, chips: 1000, hands: [
        { bet: 10, cards: [{ rank: 'ace', suit: 'hearts' }, { rank: 'two', suit: 'spades' }]},
        { bet: 20, cards: [{ rank: 'ace', suit: 'hearts' }, { rank: 'two', suit: 'spades' }]},
        { bet: 30, cards: [{ rank: 'ace', suit: 'hearts' }, { rank: 'two', suit: 'spades' }]}
      ]}
    ],
    messages: [
      'This is a message.',
      'This is a longer message.'
    ]
  });

  // const socket = io();

  // useEffect(() => {
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {/* <SocketContext.Provider value={socket}> */}
          {props.children}
        {/* </SocketContext.Provider> */}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

// ContextProvider.propTypes = {
//   foo: PropTypes.bool.isRequired
// };

function useStateContext() {
  const context = useContext(StateContext);

  if (context === undefined) {
    throw new Error('useStateContext must be used within ContextProvider');
  }

  return context;
}

function useDispatchContext() {
  const context = useContext(DispatchContext);

  if (context === undefined) {
    throw new Error('useDispatchContext must be used within ContextProvider');
  }

  return context;
}

function useSocketContext() {
  const context = useContext(SocketContext);

  if (context === undefined) {
    throw new Error('useSocketContext must be used within ContextProvider');
  }

  return context;
}

export { ContextProvider, useStateContext, useDispatchContext, useSocketContext };
