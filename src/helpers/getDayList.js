export function getDayList(month, year = new Date().getFullYear()) {
  const maxDay = new Date(year, month + 1, 0).getDate();
  const daysArray = [];
  for (let i = 1; i <= maxDay; i++) {
    daysArray.push(i);
  }
  return daysArray;
}
