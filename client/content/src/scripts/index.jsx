import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'react-chrome-redux';
import App from './components/app';


const app = document.getElementById('app');

const proxyStore = new Store({
  state: {},
  portName: 'YourStory',
});

const unsubscribe = proxyStore.subscribe(() => {
  unsubscribe(); // make sure to only fire once

  ReactDOM.render(
    <Provider store={proxyStore}>
      <App />
    </Provider>
  , app);
});
