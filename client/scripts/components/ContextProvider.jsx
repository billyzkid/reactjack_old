import React, { createContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import { initialState, reducer } from '../context.js';

const StateContext = createContext();
const DispatchContext = createContext();
const SocketContext = createContext();

const ContextProvider = (props) => {
  console.log('ContextProvider render', props);

  const { children }  = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  let socket;

  useEffect(() => {
    socket = io();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <SocketContext.Provider value={socket}>
          {children}
        </SocketContext.Provider>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { ContextProvider, StateContext, DispatchContext, SocketContext };
