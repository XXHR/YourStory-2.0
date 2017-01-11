'use strict';

import axios from 'axios';
// const initialState = 'no token';

// function updateToken(data) {
//   return {
//     type: 'GET_TOKEN',
//     payload: data,
//   };
// }

export default function getToken(token) {
  console.log("token in getToken");
  return {
    type: 'GET_TOKEN',
    payload: token.payload,
  };

  // console.log("inside get token");
  // return function (dispatch) {
  //   console.log("attempting to do chrome.identity");
  // // START testing chrome identity - this should not make it to production
  //   chrome.identity.getAuthToken({
  //     interactive: true,
  //   }, (token) => {
  //     // dispatch(updateToken(token));

  //     // console.log("token: ", token);
  //     // var microsecondsPerDay = 1000 * 60 * 60 * 24;
  //     // var oneDayAgo = (new Date).getTime() - microsecondsPerDay;
  //     // chrome.history.search({
  //     //   'text': '',              // Return every history item....
  //     //   'startTime': oneDayAgo  // that was accessed less than one week ago.
  //     // }, function(array){
  //     //   console.log('chrome history array', array);
  //     // });
  //   });
  //   // END testing chrome identity
  //   return null;
  // };
};
