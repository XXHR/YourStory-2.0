import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { alias, wrapStore } from 'react-chrome-redux';
import rootReducer from './reducers';
import aliases from './aliases';

const middleware = [alias(aliases), ReduxThunk];
const store = createStore(rootReducer, applyMiddleware(
  ...middleware));

wrapStore(store, {
  portName: 'YourStory',
});
