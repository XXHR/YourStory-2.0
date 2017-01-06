module.exports.getDateToday = () => {
  const today = new Date();
  const year = today.getFullYear().toString();
  const month = (today.getMonth() + 1).toString();
  const day = (today.getDate()).toString();

  return year + '-' + month + '-' + day;
}