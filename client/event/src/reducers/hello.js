export default (state = {}, action) => {
  switch (action.type) {
    case 'SAY_HELLO': {
      return action.payload.data
      break;
    }
  }
  return state;
}