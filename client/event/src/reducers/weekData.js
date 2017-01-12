const initialState = 'no week data yet';

export default (state = initialState, action) => {    
  switch (action.type) {    
    case 'GET_WEEK_DATA':
      return action.payload;
    default:
      return state;
  }
};
