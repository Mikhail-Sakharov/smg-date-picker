import {createCalendarData} from '../data-generator/create-calendar-data';
import {Lang} from '../enums/localization/localization';
import {Localization} from '../enums/localization/localization.enum';
import {buildCalendarDays} from '../view-builders/calendar-days.builder';

export const handleNextMonthButtonClick = (
  anchorElement: HTMLElement,
  headerElement: HTMLElement,
  datePickerContainerElement: HTMLElement,
  localization: Localization,
  restoreDayElementClickHandler: (collection: NodeListOf<Element>) => void
) => {
  const headerTitleElement = headerElement.querySelector('.smg-date-picker__title');
  const month = Number(headerTitleElement?.getAttribute('data-month'));
  const nextMonth = month === 11 ? 0 : month + 1;
  const year = Number(headerTitleElement?.getAttribute('data-year'));
  const nextYear = month === 11 ? year + 1 : year;

  if (headerTitleElement) {
    headerTitleElement.setAttribute('data-month', `${nextMonth}`);
    headerTitleElement.setAttribute('data-year', `${nextYear}`);
    headerTitleElement.textContent = `${Object.values(Lang[localization].months)[nextMonth]} ${nextYear}`;
  }

  const updatedCalendarData = createCalendarData(nextMonth, nextYear);

  const rangeOptions = {
    anchorElementDateValue: anchorElement.getAttribute('data-date'),
    anchorElementStartDateValue: anchorElement.getAttribute('data-start-date'),
    anchorElementFinishDateValue: anchorElement.getAttribute('data-finish-date')
  };

  const updatedCalendarDaysElementView = buildCalendarDays(updatedCalendarData, rangeOptions);
  const updatedCalendarDayCollection = updatedCalendarDaysElementView.querySelectorAll('.smg-date-picker__day');
  restoreDayElementClickHandler(updatedCalendarDayCollection);

  const deprecatedCalendarDaysElementView = datePickerContainerElement.querySelector('.smg-date-picker__days');
  deprecatedCalendarDaysElementView?.replaceWith(updatedCalendarDaysElementView);
};
