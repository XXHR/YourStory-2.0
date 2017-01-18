const initialState = 'no history by date data yet';

export default (state = initialState, action) => {    
  switch (action.type) {    
    case 'GET_HISTORY_BY_DATE':
      return action.payload;
    default:
      return state;
  }
};
