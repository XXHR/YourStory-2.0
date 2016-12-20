'use strict'

const DateRange = require('../server/routeHandlers/helpers/createDateArray');

describe('Get Date Range Constructor', () => {
  let dates;
  const today = new Date().getDate();
  const thisMonth = new Date().getMonth() + 1;
  const thisYear = new Date().getFullYear();
  const oneWeekAgo = today - 6;
  const nextWeek = today + 6;

  beforeEach(() => {
    dates = new DateRange();
  });
  afterEach(() => {
    dates = null;
  })

  it('should return a default array of the previous week\'s dates', () => {
    const weekArray = dates.createDateArray();

    expect(typeof (weekArray)).toEqual('array');
    expect(weekArray.length).toBe(7);
    expect(weekArray).toContain(thisYear + '-' + thisMonth + '-' + today);
    expect(weekArray).toContain(thisYear + '-' + thisMonth + '-' + oneWeekAgo);
  });

  it('should account for the boundary of a month', () => {
    const date = new Date(2016,1,29);
    const startDay = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const endDay = startDay + 6;

    const monthEnd = dates(startDay, month, year, endDay, 1).createDateArray();

    expect(monthEnd[2]).toBe('2016-1-31');
    expect(monthEnd[3]).toBe('2016-2-1');
  });

  it('should account for the boundary of a year', () => {
    const date = new Date(2016,12,29);
    const startDay = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const endDay = startDay + 6;

    const yearEnd = dates(startDay, month, year, endDay, 1).createDateArray();

    expect(yearEnd[2]).toBe('2016-12-31');
    expect(yearEnd[3]).toBe('2017-1-1');
  });

  it('should return dates in descending order', () => {
    const weekArray = dates.createDateArray();

    expect(weekArray[0]).toBe(thisYear + '-' + thisMonth + '-' + oneWeekAgo);
    expect(weekArray[7]).toBe(thisYear + '-' + thisMonth + '-' + today);

  });

  it('should return dates in ascending order', () => {
    const weekArray = dates.createDateArray(today, thisMonth, thisYear, nextWeek, 1);

    expect(weekArray[7]).toBe(thisYear + '-' + thisMonth + '-' + oneWeekAgo);
    expect(weekArray[0]).toBe(thisYear + '-' + thisMonth + '-' + today);
  });

  it('should account for leap years', () => {
    const date = new Date(2016,2,14);
    const startDay = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const endDay = startDay + 30;
    const oneMonth = dates(startDay, month, year, endDay, 1).createDateArray();

    expect(oneMonth[15]).toBe('2016-2-29')
  });

  it('should return a range of dates up to 31 days in length', () => {
    const date = new Date();
    const startDay = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const endDay = startDay + 30;
    const oneMonth = dates(startDay, month, year, endDay, 1).createDateArray();

    expect(oneMonth.length).toBe(31);
  });

  xit('should return a range of dates up to a year in length', () => {
    //TODO: implement this functionality and write this test
  });
});
