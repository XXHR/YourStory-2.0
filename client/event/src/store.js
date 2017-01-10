import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { alias, wrapStore } from 'react-chrome-redux';
import rootReducer from './reducers';
// import loadTokenOnResponse from './auth/auth';
// import fetchVisData from './actions/fetch_vis_data.js';

const aliases = {
  // this key is the name of the action to proxy, the value is the action
  // creator that gets executed when the proxied action is received in the
  // background

  'user-clicked-alias': function () {
    console.log('inside store.js');
    const data = {
      type: 'ADD_COUNT',
    };

    return data;
  },
};

const createStoreWithMiddleware = applyMiddleware(
  ReduxThunk, alias(aliases)
)(createStore);

const store = createStoreWithMiddleware(rootReducer);

wrapStore(store, {
  portName: 'YourStory',
});
