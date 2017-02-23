import throttle from 'lodash/throttle';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { alias, wrapStore } from 'react-chrome-redux';
// import rootReducer from './reducers/index';
import { combineReducers } from 'redux';

import chromeID from './reducers/chromeID';
import timeHistoryLastFetched from './reducers/timeHistoryLastFetched';
import historyByDate from './reducers/historyByDate';
import history from './reducers/history';
import catData from './reducers/catData';
import aliases from './aliases';


chrome.storage.local.get([
  'state',
], ({ initialStateForLocalStorage }) => {
  console.log('INITIAL STATE FROM CHROME', initialStateForLocalStorage);
  const rootReducer = combineReducers({
    chromeID,
    timeHistoryLastFetched,
    historyByDate,
    history,
    catData,
  });

  const middleware = [alias(aliases), ReduxThunk];

  const store = createStore(
    rootReducer,
    applyMiddleware(
  ...middleware));

  wrapStore(store, {
    portName: 'YourStory',
  });

  const saveState = () => {
    console.info('Saving state to chrome.storage.local');
    const state = store.getState();
    chrome.storage.local.set({
      state,
    });
    chrome.storage.local.get(['state'], ({ initialStateForLocalStorage }) => {
      console.log('STATE AFTER STORING', state);
    });
  };

   // On new state, persist to local storage
  const throttledSave = throttle(saveState, 5000, { trailing: true, leading: true });

  store.subscribe(throttledSave);
});
// export default store;
