const initialState = 'no chromeID';

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CHROMEID':
      return action.payload;
    default:
      return state;
  }
};
