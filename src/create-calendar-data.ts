import {CalendarData} from './interfaces/calendar-data.interface';

export const createCalendarData = (month?: number, year?: number): CalendarData[] => {
  const selectedMonthNumber = month ?? (new Date()).getMonth();
  const selectedYearNumber = year ?? (new Date()).getFullYear();

  const selectedMonth = new Date(selectedYearNumber, selectedMonthNumber);
  const weekdayOfTheFirstDay = selectedMonth.getDay() || 7;
  const prevMonthDaysCount = (new Date(Number(selectedMonth) - 3600 * 24 * 1000)).getDate();
  const selectedPeriodStartValue = prevMonthDaysCount - weekdayOfTheFirstDay + 1;

  const nextMonth = new Date(selectedYearNumber, selectedMonthNumber + 1);
  const selectedMonthDaysCount = (new Date(Number(nextMonth) - 3600 * 24 * 1000)).getDate();

  const prevMonthDays = Array.from({length: prevMonthDaysCount})
    .map((_item, index) => ({
      value: index + 1,
      date: (new Date(selectedYearNumber, selectedMonthNumber - 1, index + 1)).toISOString(),
      isOutsideSelectedPeriod: true
    }))
    .slice(selectedPeriodStartValue);

  const selectedMonthDays = Array.from({length: selectedMonthDaysCount})
    .map((_item, index) => {
      const value = index + 1;
      const today = (new Date()).getDate();
      const isCurrentDay = value === today
        && selectedMonthNumber === (new Date()).getMonth()
        && selectedYearNumber === (new Date()).getFullYear();
      return {
        value,
        date: (new Date(selectedYearNumber, selectedMonthNumber, value)).toISOString(),
        isOutsideSelectedPeriod: false,
        isCurrentDay
      };
    });

  const nextMonthDaysCount = (new Date(Number(new Date(selectedYearNumber, selectedMonthNumber + 2)) - 3600 * 24)).getDate();
  const nextMonthDays = Array.from({length: nextMonthDaysCount})
    .map((_item, index) => ({
      value: index + 1,
      date: (new Date(selectedYearNumber, selectedMonthNumber + 1, index + 1)).toISOString(),
      isOutsideSelectedPeriod: true
    }));

  const prevAndCurrentMonthDays = [...prevMonthDays, ...selectedMonthDays];

  const isCalendarFilledExactly = prevAndCurrentMonthDays.length % 7;

  if (isCalendarFilledExactly === 0) {
    return [...prevAndCurrentMonthDays, ...nextMonthDays.slice(0, 7)];
  } else {
    let requiredCalendarDaysCount = prevAndCurrentMonthDays.length;
    while (requiredCalendarDaysCount % 7 !== 0) {
      requiredCalendarDaysCount++;
    }
    const requiredNextMonthDaysCount = requiredCalendarDaysCount - prevAndCurrentMonthDays.length;
    return [...prevAndCurrentMonthDays, ...nextMonthDays.slice(0, requiredNextMonthDaysCount)];
  }
};
