import React, { createContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

const StateContext = createContext();
const DispatchContext = createContext();
const SocketContext = createContext();

const ContextProvider = (props) => {
  console.log('ContextProvider render', props);

  const { state: initialState, reducer, children } = props;
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
        <SocketContext.Provider value={socket} children={children} />
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

ContextProvider.propTypes = {
  state: PropTypes.object.isRequired,
  reducer: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export { ContextProvider, StateContext, DispatchContext, SocketContext };
