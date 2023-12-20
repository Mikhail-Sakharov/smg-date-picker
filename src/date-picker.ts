import {
  buildCalendarContainer,
  buildCalendarDays,
  buildControls,
  buildDatePicker,
  buildHeader,
  buildWeekdayNames
} from './calendar';
import {CalendarMode} from './enums/calendar-mode.enum';
import {createCalendarData} from './create-calendar-data';
import {DatePickerOptions} from './interfaces/date-picker-options.interface';
import {Lang} from './localization';
import {Localization} from './enums/localization.enum';
import './styles/style.css';

export const createSMGDatePicker = ({
  anchorElement,
  firstOutputElement,
  secondOutputElement,
  mode = CalendarMode.Single,
  localization = Localization.Eng,
  callback
}: DatePickerOptions) => {
  const headerData = {
    currentMonth: (new Date()).getMonth(),
    currentYear: (new Date()).getFullYear()
  };
  const calendarData = createCalendarData();

  anchorElement.classList.add('smg-date-picker-anchor');

  const datePickerElement = buildDatePicker();
  const datePickerContainerElement = buildCalendarContainer();
  const headerElement = buildHeader(localization, headerData);
  const weekdayNamesElement = buildWeekdayNames(localization);
  const rangeOptions = {
    anchorElementDateValue: anchorElement.getAttribute('data-date'),
    anchorElementStartDateValue: anchorElement.getAttribute('data-start-date'),
    anchorElementFinishDateValue: anchorElement.getAttribute('data-finish-date')
  };
  const calendarDaysElement = buildCalendarDays(calendarData, rangeOptions);
  const calendarDayCollection = calendarDaysElement.querySelectorAll('.smg-date-picker__day');
  const calendarControls = buildControls();
  const clearButton = calendarControls.querySelector('.smg-date-picker__clear-button');
  const applyButton = calendarControls.querySelector('.smg-date-picker__apply-button');

  const handleClearButtonClick = () => {
    firstOutputElement.textContent = '';

    if (secondOutputElement) {
      secondOutputElement.textContent = '';
    }

    anchorElement.removeAttribute('data-date');
    anchorElement.removeAttribute('data-start-date');
    anchorElement.removeAttribute('data-finish-date');

    document.querySelectorAll('.smg-date-picker__day').forEach((item) => {
      item.classList.remove('smg-date-picker__day--start');
      item.classList.remove('smg-date-picker__day--finish');
      item.classList.remove('smg-date-picker__day--within-the-range');
    });
  };

  const handleApplyButtonClick = () => {
    const singleDate = anchorElement.getAttribute('data-date');
    const startDate = anchorElement.getAttribute('data-start-date');
    const finishDate = anchorElement.getAttribute('data-finish-date');

    if (callback && startDate && finishDate) {
      callback(startDate, finishDate);
    }
    if (callback && singleDate) {
      callback(singleDate);
    }
    if (singleDate || startDate && finishDate) {
      datePickerElement.classList.toggle('opened');
    }
  };

  datePickerContainerElement.append(headerElement);
  datePickerContainerElement.append(weekdayNamesElement);
  datePickerContainerElement.append(calendarDaysElement);
  datePickerContainerElement.append(calendarControls);
  datePickerElement.append(datePickerContainerElement);
  anchorElement.after(datePickerElement);

  const nextMonthButton = headerElement.querySelector('.smg-date-picker__right-arrow');
  const prevMonthButton = headerElement.querySelector('.smg-date-picker__left-arrow');

  const handleDayElementClick = (dayElement: Element, collection: NodeListOf<Element>) => {
    const selectedDate = dayElement.getAttribute('data-date');
    const isSelectedDateLessThanTodayDate = new Date(selectedDate!) < new Date();

    if (!isSelectedDateLessThanTodayDate) {
      collection.forEach((item) => {
        item.classList.remove('smg-date-picker__day--start');
      });

      dayElement.classList.add('smg-date-picker__day--start');
      firstOutputElement.textContent = (new Date(selectedDate!)).toLocaleDateString();
      anchorElement.setAttribute('data-date', selectedDate!);
    }
  };

  const addDayElementClickHandlers = (collection: NodeListOf<Element>) => {
    collection.forEach((dayElement) => {
      dayElement.addEventListener('click', () => handleDayElementClick(dayElement, collection));
    });
  };

  const handleDayElementClickRangeMode = (dayElement: Element, collection: NodeListOf<Element>) => {
    const selectedDate = dayElement.getAttribute('data-date'); // ISOString
    const isSelectedDateLessThanTodayDate = new Date(selectedDate!) < new Date(); // block selecting from the past

    if (!isSelectedDateLessThanTodayDate) {
      const startDate = anchorElement.getAttribute('data-start-date');
      const finishDate = anchorElement.getAttribute('data-finish-date');
      const isNothingSelected = !startDate && !finishDate;
      const isOnlyStartDateSelected = startDate && !finishDate;
      const isBothDatesSelected = startDate && finishDate;

      if (isNothingSelected) {
        dayElement.classList.add('smg-date-picker__day--start');
        firstOutputElement.textContent = (new Date(selectedDate!)).toLocaleDateString();
        anchorElement.setAttribute('data-start-date', selectedDate!);
      }

      if (isOnlyStartDateSelected) {
        const isNewStartDateLessThanSelectedStart = new Date(selectedDate!) < new Date(startDate);

        if (isNewStartDateLessThanSelectedStart) {
          collection.forEach((item) => {
            item.classList.remove('smg-date-picker__day--start');
          });

          dayElement.classList.add('smg-date-picker__day--start');
          firstOutputElement.textContent = (new Date(selectedDate!)).toLocaleDateString();
          anchorElement.setAttribute('data-start-date', selectedDate!);
        } else {
          const startDateIndex = Array.from(collection).findIndex((item) => item.classList.contains('smg-date-picker__day--start'));
          const finishDateIndex = Array.from(collection).findIndex((item) => item === dayElement);

          collection.forEach((item, index) => {
            const isDayElementWithinTheRange = index > startDateIndex && index < finishDateIndex;
            if (isDayElementWithinTheRange) {
              item.classList.add('smg-date-picker__day--within-the-range');
            }
          });

          dayElement.classList.add('smg-date-picker__day--finish');

          if (secondOutputElement) {
            firstOutputElement.textContent = (new Date(startDate!)).toLocaleDateString();
            secondOutputElement.textContent = (new Date(selectedDate!)).toLocaleDateString();
          } else {
            firstOutputElement.textContent = `${(new Date(startDate!)).toLocaleDateString()} - ${(new Date(selectedDate!)).toLocaleDateString()}`;
          }

          anchorElement.setAttribute('data-finish-date', selectedDate!);
        }
      }

      if (isBothDatesSelected) {
        collection.forEach((item) => {
          item.classList.remove('smg-date-picker__day--start');
          item.classList.remove('smg-date-picker__day--finish');
          item.classList.remove('smg-date-picker__day--within-the-range');
        });

        dayElement.classList.add('smg-date-picker__day--start');
        firstOutputElement.textContent = (new Date(selectedDate!)).toLocaleDateString();
        anchorElement.setAttribute('data-start-date', selectedDate!);
        anchorElement.removeAttribute('data-finish-date');
      }
    }
  };

  const addDayElementClickHandlersRangeMode = (collection: NodeListOf<Element>) => {
    collection.forEach((dayElement) => {
      dayElement.addEventListener('click', () => handleDayElementClickRangeMode(dayElement, collection));
    });
  };

  const handleAnchorElementClick = () => {
    datePickerElement.classList.toggle('opened');
  };

  const handleOutsideDatePickerClick = (evt: Event) => {
    const isInsideDatePicker = evt.composedPath().includes(datePickerElement);
    const isAnchorElementClicked = evt.composedPath().includes(anchorElement);
    if (!isInsideDatePicker && !isAnchorElementClicked) {
      datePickerElement.classList.remove('opened');
    }
  };

  const handleDocumentKeydown = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      datePickerElement.classList.remove('opened');
    }
  };

  const handleNextMonthButtonClick = () => {
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

    switch(mode) {
      case CalendarMode.Single:
        addDayElementClickHandlers(updatedCalendarDayCollection);
        break;
      case CalendarMode.Range:
        addDayElementClickHandlersRangeMode(updatedCalendarDayCollection);
        break;
    }

    const deprecatedCalendarDaysElementView = datePickerContainerElement.querySelector('.smg-date-picker__days');
    deprecatedCalendarDaysElementView?.replaceWith(updatedCalendarDaysElementView);
  };

  const handlePrevMonthButtonClick = () => {
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

    switch(mode) {
      case CalendarMode.Single:
        addDayElementClickHandlers(updatedCalendarDayCollection);
        break;
      case CalendarMode.Range:
        addDayElementClickHandlersRangeMode(updatedCalendarDayCollection);
        break;
    }

    const deprecatedCalendarDaysElementView = datePickerContainerElement.querySelector('.smg-date-picker__days');
    deprecatedCalendarDaysElementView?.replaceWith(updatedCalendarDaysElementView);
  };

  anchorElement.addEventListener('click', handleAnchorElementClick);
  document.addEventListener('click', (evt) => handleOutsideDatePickerClick(evt));
  document.addEventListener('keydown', (evt) => handleDocumentKeydown(evt));
  nextMonthButton?.addEventListener('click', handleNextMonthButtonClick);
  prevMonthButton?.addEventListener('click', handlePrevMonthButtonClick);
  clearButton?.addEventListener('click', handleClearButtonClick);
  applyButton?.addEventListener('click', handleApplyButtonClick);

  switch(mode) {
    case CalendarMode.Single:
      addDayElementClickHandlers(calendarDayCollection);
      break;
    case CalendarMode.Range:
      addDayElementClickHandlersRangeMode(calendarDayCollection);
      break;
  }
};
