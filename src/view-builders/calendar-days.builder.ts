import {CalendarData} from '../interfaces/calendar-data.interface';
import {RangeOptions} from '../interfaces/range-options.interface';

export const buildCalendarDays = (calendarData: CalendarData[], rangeOptions: RangeOptions) => {
  const {
    anchorElementDateValue,
    anchorElementStartDateValue,
    anchorElementFinishDateValue
  } = rangeOptions;
  const isBothDatesSelected = anchorElementStartDateValue && anchorElementFinishDateValue;

  const calendarDaysElement = document.createElement('div');
  calendarDaysElement.classList.add('smg-date-picker__days');
  calendarData.forEach((day) => {
    const isDayWithinTheRange = isBothDatesSelected
      && new Date(day.date) > new Date(anchorElementStartDateValue)
      && new Date(day.date) < new Date(anchorElementFinishDateValue);
    const isAfterToday = new Date(day.date) > new Date();
    const dayElement = document.createElement('div');
    const daySpanElement = document.createElement('span');
    dayElement.classList.add('smg-date-picker__day');
    dayElement.setAttribute('data-date', day.date);
    if (day.isOutsideSelectedPeriod) {
      dayElement.classList.add('smg-date-picker__day--outside-period');
    }
    if (day.isCurrentDay) {
      dayElement.classList.add('smg-date-picker__day--current');
    }
    if (day.date === anchorElementDateValue) {
      dayElement.classList.add('smg-date-picker__day--start');
    }
    // if (day.date === anchorElementStartDateValue) {
    //   dayElement.classList.add('smg-date-picker__day--start');
    // }
    // if (day.date === anchorElementFinishDateValue) {
    //   dayElement.classList.add('smg-date-picker__day--finish');
    // }
    if (isDayWithinTheRange) {
      dayElement.classList.add('smg-date-picker__day--within-the-range');
    }
    if (isAfterToday) {
      dayElement.classList.add('smg-date-picker__day--after-today');
    }
    daySpanElement.classList.add('smg-date-picker__day-number');
    daySpanElement.textContent = day.value.toString();
    dayElement.append(daySpanElement);
    calendarDaysElement.append(dayElement);
  });

  return calendarDaysElement;
};
