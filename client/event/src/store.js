import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { alias, wrapStore } from 'react-chrome-redux';
import rootReducer from './reducers';
import aliases from './aliases';


const createStoreWithMiddleware = applyMiddleware(
  ReduxThunk, alias(aliases)
)(createStore);

const store = createStoreWithMiddleware(rootReducer);

wrapStore(store, {
  portName: 'YourStory',
});
