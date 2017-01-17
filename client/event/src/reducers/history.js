export default (state = {}, action) => {
  switch (action.type) {
    case 'POST_HISTORY':
      return action.payload;
    default:
      return state;
  }
};
