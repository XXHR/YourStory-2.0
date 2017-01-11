const initialState = 'no token';

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_TOKEN':
      return action.payload;
    default:
      return state;
  }
};
