

export const formatDate = (date) => {
  const d = new Date(date);
  const addZero = (input) => {
    if (input.length < 2) input = '0' + input;
  };
  let month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear(),
    hours = '' + d.getHours(),
    minutes = '' + d.getMinutes(),
    seconds = '' + d.getSeconds();

  addZero(month);
  addZero(day);
  addZero(hours);
  addZero(minutes);
  addZero(seconds);

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};