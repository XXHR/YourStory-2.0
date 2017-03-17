const initialState = Date.now(); // do not modify date format, it needs to be in milliseconds

export default (state = initialState, action) => {
  switch (action.type) {
    case 'Time_History_Last_Fetched':
      return action.payload;
    default:
      return state;
  }
};
