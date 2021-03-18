import { useContext } from 'react';
import { StateContext, DispatchContext, SocketContext } from './components/ContextProvider.jsx';

function useStateContext() {
  const context = useContext(StateContext);

  if (!context) {
    throw new Error('useStateContext must be used within ContextProvider');
  }

  return context;
}

function useDispatchContext() {
  const context = useContext(DispatchContext);

  if (!context) {
    throw new Error('useDispatchContext must be used within ContextProvider');
  }

  return context;
}

function useSocketContext() {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error('useSocketContext must be used within ContextProvider');
  }

  return context;
}

export { useStateContext, useDispatchContext, useSocketContext };
