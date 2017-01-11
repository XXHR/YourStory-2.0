'use strict';

export default function getToken(token) {
  console.log("token in getToken");
  return {
    type: 'GET_TOKEN',
    payload: token.payload,
  };
}
