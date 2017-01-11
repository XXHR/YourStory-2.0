const initialState = 'no chrome id';

export default (state = initialState, action) => {
  console.log("inside chromeID reducer", state);

  switch (action.type) {
    case 'GET_CHROMEID':
      return action.payload;
    default:
      return state;
  }
};
