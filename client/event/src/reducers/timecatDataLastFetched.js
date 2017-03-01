const initialState = 'catData not fetched yet';

export default (state = initialState, action) => {    
  switch (action.type) {    
    case 'CATDATA_LAST_FETCHED':
      return action.payload;
    default:
      return state;
  }
};
