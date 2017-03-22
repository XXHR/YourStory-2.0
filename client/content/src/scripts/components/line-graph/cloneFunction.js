function cloneObject(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  let temp = obj.constructor(); // give temp the original obj's constructor

  for (let key in obj) {
    temp[key] = cloneObject(obj[key]);
  }

  return temp;
}

module.exports = cloneObject;
