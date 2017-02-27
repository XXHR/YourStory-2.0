const tenMinutes = 1000 * 60 * 60 * 72;
const tenMinutesAgo = (new Date).getTime() - tenMinutes;

const initialState = tenMinutesAgo;

export default (state = initialState, action) => {
  switch (action.type) {
    case 'Time_History_Last_Fetched':
      return action.payload;
    default:
      return state;
  }
};
