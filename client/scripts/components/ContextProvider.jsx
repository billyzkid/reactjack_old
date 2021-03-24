import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { useImmerReducer } from 'use-immer';
import { socket, initialState, reducer } from '../context.js';

const SocketContext = createContext();
const StateContext = createContext();
const DispatchContext = createContext();

const ContextProvider = (props) => {
  console.log('ContextProvider render', props);

  const { children } = props;
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  return (
    <SocketContext.Provider value={socket}>
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch} children={children} />
      </StateContext.Provider>
    </SocketContext.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default ContextProvider;
export { SocketContext, StateContext, DispatchContext };
