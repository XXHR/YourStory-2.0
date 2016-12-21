'use strict'

const DateRange = require('../../../server/routeHandlers/helpers/createDateArray');

describe('Date Range Constructor', function () {
  const today = new Date().getDate();
  const thisMonth = new Date().getMonth() + 1;
  const thisYear = new Date().getFullYear();
  const oneWeekAgo = today - 6;
  const nextWeek = today + 6;

  it('should return a default array of the previous week\'s dates', function () {
    const weekArray = new DateRange().createDateArray();

    expect(weekArray).toEqual(jasmine.any(Array));
    expect(weekArray.length).toBe(7);
    expect(weekArray).toContain(thisYear + '-' + thisMonth + '-' + today);
    expect(weekArray).toContain(thisYear + '-' + thisMonth + '-' + oneWeekAgo);
  });

  it('should account for the boundary of a month', function () {
    const date = new Date(2016,0,29);
    const startDay = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const endDay = startDay + 6;

    const monthEnd = new DateRange(startDay, month, year, endDay, 1).createDateArray();

    expect(monthEnd[2]).toBe('2016-1-31');
    expect(monthEnd[3]).toBe('2016-2-1');
  });

  it('should account for the boundary of a year', function () {
    const date = new Date(2016,11,29);
    const startDay = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const endDay = startDay + 6;

    const yearEnd = new DateRange(startDay, month, year, endDay, 1).createDateArray();

    expect(yearEnd[2]).toBe('2016-12-31');
    expect(yearEnd[3]).toBe('2017-1-1');
  });

  it('should return dates in descending order', function () {
    const weekArray = new DateRange().createDateArray();

    expect(weekArray[0]).toBe(thisYear + '-' + thisMonth + '-' + today);
    expect(weekArray[6]).toBe(thisYear + '-' + thisMonth + '-' + oneWeekAgo);

  });

  it('should return dates in ascending order', function () {
    const weekArray = new DateRange(today, thisMonth, thisYear, nextWeek, 1).createDateArray();

    expect(weekArray[0]).toBe(thisYear + '-' + thisMonth + '-' + today);
    expect(weekArray[6]).toBe(thisYear + '-' + thisMonth + '-' + nextWeek);
  });

  it('should account for leap years', function () {
    const date = new Date(2016,2,14);
    const startDay = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const endDay = startDay + 30;
    const oneMonth = new DateRange(startDay, month, year, endDay, 1).createDateArray();

    expect(oneMonth[15]).toBe('2016-2-29')
  });

  it('should return a range of dates up to 31 days in length', function () {
    const date = new Date();
    const startDay = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const endDay = startDay + 30;
    const oneMonth = new DateRange(startDay, month, year, endDay, 1).createDateArray();

    expect(oneMonth.length).toBe(31);
  });

  xit('should return a range of dates up to a year in length', function () {
    //TODO: implement this functionality and write this test
  });
});
