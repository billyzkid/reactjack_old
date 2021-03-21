import { useContext, useState, useEffect } from 'react';
import { StateContext, DispatchContext, SocketContext } from './components/Context.jsx';

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

function useIsMounted() {
  const [isMounted, setisMounted] = useState(false);

  useEffect(() => {
    setisMounted(true);
    return () => setisMounted(false);
  }, [])

  return isMounted;
}

export { useStateContext, useDispatchContext, useSocketContext, useIsMounted };
