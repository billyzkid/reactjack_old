import React, { createContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

const StateContext = createContext();
const DispatchContext = createContext();
const SocketContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'toggleModal1':
      return { ...state, isModal1Open: action.isOpen };
    case 'toggleModal2':
      return { ...state, isModal2Open: action.isOpen };
    case 'toggleModal3':
      return { ...state, isModal3Open: action.isOpen };
    case 'addPlayer':
      return { ...state, players: state.players.concat(action.player) };
    case 'removePlayer':
      return { ...state, players: state.players.filter(p => p.id !== action.id) };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    isModal1Open: false,
    isModal2Open: false,
    isModal3Open: false,
    dealer: {
      name: 'Dealer',
      hand: {
        cards: [
          { rank: 'Ace', suit: 'Hearts' },
          { rank: '?', suit: '?' }
        ]
      }
    },
    players: [
      { id: 'Player1', name: 'Will', hands: [] },
      { id: 'Player2', name: 'Lisa', hands: [] },
      { id: 'Player3', name: 'Tyler', hands: [] }
    ]
  });

  const socket = io();

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <SocketContext.Provider value={socket}>
          {props.children}
        </SocketContext.Provider>
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