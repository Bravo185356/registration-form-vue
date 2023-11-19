import { monthList } from "../constants/MonthList";

export function getMonthIndex(monthName) {
  return monthList.findIndex((month) => month === monthName);
}
