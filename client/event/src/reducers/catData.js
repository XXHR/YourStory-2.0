const initialState = 'no catData';

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CAT_DATA':
      return action.payload;
    default:
      return state;
  }
}    