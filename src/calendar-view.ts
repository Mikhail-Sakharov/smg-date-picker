import {CalendarData} from './interfaces/calendar-data.interface';
import {HeaderData} from './interfaces/header-data.interface';
import {RangeOptions} from './interfaces/range-options.interface';

import {Localization} from './localization.enum';

import {handleDayElementClick} from './handlers/day-element-click.handler';
import {handleNextMonthButtonClick} from './handlers/next-month-button-click.handler';
import {handlePrevMonthButtonClick} from './handlers/prev-month-button-click.handler';

import {buildCalendarContainer} from './view-builders/calendar-container.builder';
import {buildCalendarDays} from './view-builders/calendar-days.builder';
import {buildControls} from './view-builders/controls.builder';
import {buildDatePicker} from './view-builders/date-picker.builder';
import {buildHeader} from './view-builders/header.builder';
import {buildWeekdayNames} from './view-builders/weekday-names.builder';

export class CalendarView {
  private headerElement: HTMLElement | null = null;
  private datePickerContainerElement: HTMLElement | null = null;

  constructor(
    private localization: Localization,
    private calendarData: CalendarData[],
    private headerData: HeaderData,
    private anchorElement: HTMLElement | null = null,
    private firstOutputElement: HTMLElement | null = null
  ) {}

  private createHeader = () => {
    const headerElement = buildHeader(this.localization, this.headerData);
    return headerElement;
  };

  private createWeekdays = () => {
    const weekdayNamesElement = buildWeekdayNames(this.localization);
    return weekdayNamesElement;
  };

  private createDays = (rangeOptions: RangeOptions) => {
    const calendarDaysElement = buildCalendarDays(this.calendarData, rangeOptions);
    return calendarDaysElement;
  };

  private createControls = () => {
    const calendarControlsElement = buildControls();
    return calendarControlsElement;
  };

  private createCalendarContainer = () => {
    const datePickerContainerElement = buildCalendarContainer();
    return datePickerContainerElement;
  };

  private createDatePicker = () => {
    const datePickerElement = buildDatePicker();
    return datePickerElement;
  };

  public build = (rangeOptions: RangeOptions) => {
    this.headerElement = this.createHeader();
    const weekdayNamesElement = this.createWeekdays();
    const calendarDaysElement = this.createDays(rangeOptions);
    const calendarDaysCollection = calendarDaysElement.querySelectorAll('.smg-date-picker__day');
    const calendarControls = this.createControls();
    this.datePickerContainerElement = this.createCalendarContainer();
    const datePickerElement = this.createDatePicker();

    this.datePickerContainerElement.append(this.headerElement);
    this.datePickerContainerElement.append(weekdayNamesElement);
    this.datePickerContainerElement.append(calendarDaysElement);
    this.datePickerContainerElement.append(calendarControls);
    datePickerElement.append(this.datePickerContainerElement);

    this.setNextMonthButtonClickHandler();
    this.setPrevMonthButtonClickHandler();
    this.setDayElementClickHandler(calendarDaysCollection);

    return datePickerElement;
  };

  private setNextMonthButtonClickHandler = () => {
    if (this.anchorElement && this.headerElement && this.datePickerContainerElement) {
      const nextMonthButton = this.headerElement.querySelector('.smg-date-picker__right-arrow');

      nextMonthButton?.addEventListener('click', () => handleNextMonthButtonClick(
        this.anchorElement!,
        this.headerElement!,
        this.datePickerContainerElement!,
        this.localization,
        this.setDayElementClickHandler
      ));
    }
  };

  private setPrevMonthButtonClickHandler = () => {
    if (this.headerElement && this.datePickerContainerElement) {
      const prevMonthButton = this.headerElement.querySelector('.smg-date-picker__left-arrow');

      prevMonthButton?.addEventListener('click', () => handlePrevMonthButtonClick(
        this.anchorElement!,
        this.headerElement!,
        this.datePickerContainerElement!,
        this.localization,
        this.setDayElementClickHandler
      ));
    }
  };

  private setDayElementClickHandler = (collection: NodeListOf<Element>) => {
    if (this.anchorElement && this.firstOutputElement) {
      collection.forEach((dayElement) => {
        dayElement.addEventListener('click', () => handleDayElementClick(
          this.anchorElement!,
          this.firstOutputElement!,
          dayElement,
          collection
        ));
      });
    }
  };
}
