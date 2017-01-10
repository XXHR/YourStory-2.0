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

  // var microsecondsPerDay = 1000 * 60 * 60 * 24;
  // var oneDayAgo = (new Date).getTime() - microsecondsPerDay;
  // chrome.history.search({
  //       'text': '',              // Return every history item....
  //       'startTime': oneDayAgo  // that was accessed less than one week ago.
  //     }, function(array){
  //         console.log('chrome history array', array);
  //     })

  ReactDOM.render(
    <Provider store={proxyStore}>
      <App />
    </Provider>
  , app);
});
