'use strict';

const User = require('../../db/schema').User;
const Domain = require('../../db/schema').Domain;

module.exports = (req, res) => {
  // make date range (today to seven days ago)
    // using date range, query for all domains and their count
  // res.sendStatus(200);

  const todayRaw = new Date();
  const today = todayRaw.getUTCDate();
  const month = todayRaw.getMonth() + 1;
  const year = todayRaw.getFullYear();

  const daysOfTheWeek = {
    today: year + '-' + month + '-' + (today),
    yesterday: year + '-' + month + '-' + (today - 1),
    twoDaysAgo: year + '-' + month + '-' + (today - 2),
    threeDaysAgo: year + '-' + month + '-' + (today - 3),
    fourDaysAgo: year + '-' + month + '-' + (today - 4),
    fiveDaysAgo: year + '-' + month + '-' + (today - 5),
    sixDaysAgo: year + '-' + month + '-' + (today - 6),
  };

  // construct an array of dates. We will map over this array, feeding each date into a
  // promised query to the database to return domain information for each day
  const getWeek = () => {
    const weekArray = [];
    for (let dia in daysOfTheWeek) {
      weekArray.push(daysOfTheWeek[dia]);
    }
    return weekArray;
  };

  // array that will be mapped. A promise function will be called for each date
  const week = getWeek();

  // initial function to be called for each date. Returns a domainId, dateId and count
  const getIds = (day) => {
    return new Promise((resolve, reject) => {
      DateTable
        .findOne({
          attributes: ['id'],
          where: {
            dateOnly: day,
          },
        })
        .then((response) => { // get all domains for specific date
          const id = response.dataValues.id;
          DateDomain
          .findAll({
            where: {
              dateId: id,
            },
          })
          .then((response) => { // save all domains to array and return them
            const domainsByDate = response.map((domain) => {
              return domain.dataValues;
            });
            return resolve(domainsByDate);
          })
          .catch((err) => {
            console.log('ERROR INSIDE DATEDOMAIN QUERY: ', err);
          });
        })
        .catch((err) => {
          console.log('ERROR: ', err);
        });
    });
  };

  // promisedWeek is the result of calling each function for each date. Returns an array
  // of promised arrays. Will be resolved by calling promise.all(promisedWeek)
  const promisedWeek = week.map((day) => {
    return getIds(day);
  });

  // next promise function to call. Will be called for each object inside each promised
  // array inside promisedWeek
  const getNameAndDate = (entry) => {
    return new Promise((resolve, reject) => {
      Domain.findOne({ where: { id: entry.domainId } })
      .then((domain) => {
        DateTable.findOne({ where: { id: entry.dateId } })
        .then((date) => {
          DateDomain.findOne({ where: { domainId: entry.domainId } })
          .then((datedDom) => {
            const nameDateCount = { count : datedDom.dataValues.count, domain: domain.dataValues.domain, date: date.dataValues.dateOnly }
             return resolve(nameDateCount);
          })
          .catch((err) => {
            console.log("ERROR GETTING COUNT IN GETNAME: ", err);
          });
        })
        .catch((err) => {
          console.log("ERROR MATCHING DATE AND NAME IN GETNAME: ", err);
        });
      })
      .catch((err) => {
        console.log("ERROR FINDING DOM IN GETNAME: ", err);
      });
    });
  };

  // make all promised arrays inside promisedArray wait to resolve until their promised
  // objects have resolved
  Promise.all(promisedWeek)
    .then((thisWeek) => {
      return new Promise((resolve, reject) => {
        const promisedArr = [];
        thisWeek.map((arr) => {
          const promisedFunctions = arr.map((obj) => {
            return getNameAndDate(obj);
          });
          promisedArr.push(promisedFunctions);
        });
        resolve(promisedArr);
      })
      .then((promisedArray) => {
        const resolvedArrays = promisedArray.map((subArray) => {
          return Promise.all(subArray);
        });
        return Promise.all(resolvedArrays)
      })
      .catch((err) => {
        console.log("ERROR RESOLVING SUB ARRAYS: ", err)
      })
      .catch((err) => {
        console.log("ERROR INSIDE PROMISED ARRAY: ", err)
      })
      .then((finalArray) => {
        console.log('FINAL WEEK DATA ARRAY', finalArray);
        res.status(200).json(
          finalArray.map((arr) => {
            const date = arr[0].date.toISOString().slice(0, 10).replace(/-/g, '');
            const finalObj = {};
            finalObj.date = date;
            finalObj.domains = arr.map((obj) => {
              return { domain: obj.domain, visits: obj.count };
            });
            const toSum = arr.map((obj) => {
              return obj.count;
            });
            finalObj.count = toSum.reduce((mem, curr) => {
              return mem + curr;
            });
            return finalObj;
          }));
      })
      .catch((err) => {
        console.log("ERROR INSIDE FINAL OBJECT CONSTRUCTION: ", err);
      })
    })
    .catch((err) => {
      console.log("ERROR IN THERE SOMEWHERE! ", err);
      res.sendStatus(404);
    });
};
