import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import './index.scss';

const socket = io();

socket.on('new user', (data) => {
  ReactDOM.render(
    <React.StrictMode>
      <h1>{data.greeting}</h1>
    </React.StrictMode>,
    document.querySelector('main')
  );
});

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
