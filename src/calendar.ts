import {CalendarData} from './interfaces/calendar-data.interface';
import {HeaderData} from './interfaces/header-data.interface';
import {Lang} from './localization';
import {Localization} from './localization.enum';
import {RangeOptions} from './interfaces/range-options.interface';

export const buildHeader = (localization: Localization, headerData: HeaderData) => {
  const {currentMonth, currentYear} = headerData;

  const calendarHeaderElement = document.createElement('div');
  calendarHeaderElement.classList.add('smg-date-picker__header');
  const calendarLeftArrowElement = document.createElement('div');
  calendarLeftArrowElement.classList.add('smg-date-picker__left-arrow');
  const calendarTitleElement = document.createElement('div');
  calendarTitleElement.classList.add('smg-date-picker__title');
  calendarTitleElement.textContent = `${Object.values(Lang[localization].months)[currentMonth]} ${currentYear}`;
  calendarTitleElement.setAttribute('data-month', currentMonth.toString());
  calendarTitleElement.setAttribute('data-year', currentYear.toString());
  const calendarRightArrowElement = document.createElement('div');
  calendarRightArrowElement.classList.add('smg-date-picker__right-arrow');

  calendarHeaderElement.append(calendarLeftArrowElement);
  calendarHeaderElement.append(calendarTitleElement);
  calendarHeaderElement.append(calendarRightArrowElement);

  return calendarHeaderElement;
};

export const buildWeekdayNames = (localization: Localization) => {
  const calendarWeekdayNamesElement = document.createElement('div');
  calendarWeekdayNamesElement.classList.add('smg-date-picker__weekday-names');
  Object.values(Lang[localization].weekdays).forEach((weekDay) => {
    const weekdayElement = document.createElement('div');
    const weekdaySpanElement = document.createElement('span');
    weekdayElement.classList.add('smg-date-picker__weekday');
    weekdaySpanElement.classList.add('smg-date-picker__weekday-name');
    weekdaySpanElement.textContent = weekDay;
    weekdayElement.append(weekdaySpanElement);
    calendarWeekdayNamesElement.append(weekdayElement);
  });

  return calendarWeekdayNamesElement;
};

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
    if (day.date === anchorElementStartDateValue) {
      dayElement.classList.add('smg-date-picker__day--start');
    }
    if (day.date === anchorElementFinishDateValue) {
      dayElement.classList.add('smg-date-picker__day--finish');
    }
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

const createButton = (title: string, className?: string) => {
  const buttonContainerElement = document.createElement('div');
  buttonContainerElement.classList.add('smg-date-picker__button-text');
  if (className) {
    buttonContainerElement.classList.add(className);
  }
  const buttonElement = document.createElement('button');
  buttonElement.textContent = title;
  buttonContainerElement.append(buttonElement);

  return buttonContainerElement;
};

export const buildControls = () => {
  const calendarControlsElement = document.createElement('div');
  calendarControlsElement.classList.add('smg-date-picker__controls');

  const clearButton = createButton('очистить', 'smg-date-picker__clear-button');
  const applyButton = createButton('применить', 'smg-date-picker__apply-button');

  calendarControlsElement.append(clearButton);
  calendarControlsElement.append(applyButton);

  return calendarControlsElement;
};

export const buildCalendarContainer = () => {
  const calendarContainerElement = document.createElement('div');
  calendarContainerElement.classList.add('smg-date-picker__container');

  return calendarContainerElement;
};

export const buildDatePicker = () => {
  const datePicker = document.createElement('div');
  datePicker.classList.add('smg-date-picker');

  return datePicker;
};
