import {Lang} from '../localization';
import {Localization} from '../enums/localization.enum';

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
