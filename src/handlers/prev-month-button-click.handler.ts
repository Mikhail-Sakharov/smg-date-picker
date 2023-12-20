import {createCalendarData} from '../engine/create-calendar-data';
import {Lang} from '../constant/localization';
import {Localization} from '../enums/localization.enum';
import {buildCalendarDays} from '../view-builders/calendar-days.builder';

export const handlePrevMonthButtonClick = (
  anchorElement: HTMLElement,
  headerElement: HTMLElement,
  datePickerContainerElement: HTMLElement,
  localization: Localization,
  restoreDayElementClickHandler: (collection: NodeListOf<Element>) => void
) => {
  const headerTitleElement = headerElement.querySelector('.smg-date-picker__title');
  const month = Number(headerTitleElement?.getAttribute('data-month'));
  const prevMonth = month === 0 ? 11 : month - 1;
  const year = Number(headerTitleElement?.getAttribute('data-year'));
  const prevYear = month === 0 ? year - 1 : year;

  if (headerTitleElement) {
    headerTitleElement?.setAttribute('data-month', `${prevMonth}`);
    headerTitleElement?.setAttribute('data-year', `${prevYear}`);
    headerTitleElement.textContent = `${Object.values(Lang[localization].months)[prevMonth]} ${prevYear}`;
  }

  const updatedCalendarData = createCalendarData(prevMonth, prevYear);

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
