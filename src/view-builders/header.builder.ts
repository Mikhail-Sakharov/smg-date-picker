import {HeaderData} from '../interfaces/header-data.interface';
import {Lang} from '../constant/localization';
import {Localization} from '../enums/localization.enum';

export const buildHeader = (localization: Localization, headerData: HeaderData) => {
  const {currentMonth, currentYear} = headerData;

  const calendarHeaderElement = document.createElement('div');
  calendarHeaderElement.classList.add('smg-date-picker__header');
  const calendarLeftArrowElement = document.createElement('button');
  calendarLeftArrowElement.classList.add('smg-date-picker__left-arrow');
  const calendarTitleElement = document.createElement('div');
  calendarTitleElement.classList.add('smg-date-picker__title');
  calendarTitleElement.textContent = `${Object.values(Lang[localization].months)[currentMonth]} ${currentYear}`;
  calendarTitleElement.setAttribute('data-month', currentMonth.toString());
  calendarTitleElement.setAttribute('data-year', currentYear.toString());
  const calendarRightArrowElement = document.createElement('button');
  calendarRightArrowElement.classList.add('smg-date-picker__right-arrow');

  calendarHeaderElement.append(calendarLeftArrowElement);
  calendarHeaderElement.append(calendarTitleElement);
  calendarHeaderElement.append(calendarRightArrowElement);

  return calendarHeaderElement;
};
