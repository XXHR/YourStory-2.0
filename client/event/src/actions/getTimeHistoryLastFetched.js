'use strict';

const finalGetTimeHistoryLastFetched = (time) => {
  const data = {
    type: 'Time_History_Last_Fetched',
    payload: time,
  };

  return data;
};

export default function getTimeHistoryLastFetched() {
  return function (dispatch) {
    const time = (new Date).getTime();
    // console.log("time: ", time);
    dispatch(finalGetTimeHistoryLastFetched(time));
  }
}