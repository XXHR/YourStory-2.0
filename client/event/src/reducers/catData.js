export default (state = {}, action) => {
  switch (action.type) {
    case 'GET_CAT_DATA':
      return action.payload;
    default:
      return state;
  }
}