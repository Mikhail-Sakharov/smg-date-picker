import {CalendarData} from './interfaces/calendar-data.interface';
import {HeaderData} from './interfaces/header-data.interface';
import {RangeOptions} from './interfaces/range-options.interface';

import {Localization} from './enums/localization/localization.enum';

import {handleDayElementClick} from './handlers/day-element-click.handler';
import {handleNextMonthButtonClick} from './handlers/next-month-button-click.handler';
import {handlePrevMonthButtonClick} from './handlers/prev-month-button-click.handler';

import {buildCalendarContainer} from './view-builders/calendar-container.builder';
import {buildCalendarDays} from './view-builders/calendar-days.builder';
import {buildControls} from './view-builders/controls.builder';
import {buildDatePicker} from './view-builders/date-picker.builder';
import {buildHeader} from './view-builders/header.builder';
import {buildWeekdayNames} from './view-builders/weekday-names.builder';
import {handleClearButtonClick} from './handlers/clear-button-click.handler';
import {handleApplyButtonClick} from './handlers/apply-button-click.handler';
import {handleRangeModeDayElementClick} from './handlers/day-element-click-range-mode.handler';
import {CalendarMode} from './enums/calendar-mode.enum';

export class CalendarView {
  private headerElement: HTMLElement | null = null;
  private calendarControls: HTMLElement | null = null;
  private datePickerContainerElement: HTMLElement | null = null;
  private datePickerElement: HTMLElement | null = null;

  private firstOutputElementInitialValue: string | null | undefined = null;
  private secondOutputElementInitialValue: string | null | undefined = null;

  constructor(
    private localization: Localization,
    private calendarData: CalendarData[],
    private headerData: HeaderData,
    private anchorElement: HTMLElement | null = null,
    private firstOutputElement: HTMLElement | null = null,
    private secondOutputElement: HTMLElement | null = null,
    private callback: (startDate: string, finishDate?: string) => void,
    private mode: CalendarMode
  ) {
    if (this.firstOutputElement) {
      this.firstOutputElementInitialValue = firstOutputElement?.textContent;
    }
    if (this.secondOutputElement) {
      this.secondOutputElementInitialValue = secondOutputElement?.textContent;
    }
  }

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
    const calendarControlsElement = buildControls(this.localization);
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
    this.calendarControls = this.createControls();
    this.datePickerContainerElement = this.createCalendarContainer();
    this.datePickerElement = this.createDatePicker();

    this.datePickerContainerElement.append(this.headerElement);
    this.datePickerContainerElement.append(weekdayNamesElement);
    this.datePickerContainerElement.append(calendarDaysElement);
    this.datePickerContainerElement.append(this.calendarControls);
    this.datePickerElement.append(this.datePickerContainerElement);

    this.setNextMonthButtonClickHandler();
    this.setPrevMonthButtonClickHandler();
    this.setClearButtonClickHandler(this.firstOutputElementInitialValue, this.secondOutputElementInitialValue);
    this.setApplyButtonClickHandler();
    switch(this.mode) {
      case CalendarMode.Single:
        this.setDayElementClickHandler(calendarDaysCollection);
        break;
      case CalendarMode.Range:
        this.setRangeModeDayElementClickHandler(calendarDaysCollection)
        break;
    }

    return this.datePickerElement;
  };

  private setNextMonthButtonClickHandler = () => {
    if (this.anchorElement && this.headerElement && this.datePickerContainerElement) {
      const nextMonthButton = this.headerElement.querySelector('.smg-date-picker__right-arrow');
      const restoreClickHandler = this.mode === CalendarMode.Single
        ? this.setDayElementClickHandler
        : this.setRangeModeDayElementClickHandler;

      nextMonthButton?.addEventListener('click', () => handleNextMonthButtonClick(
        this.anchorElement!,
        this.headerElement!,
        this.datePickerContainerElement!,
        this.localization,
        restoreClickHandler
      ));
    }
  };

  private setPrevMonthButtonClickHandler = () => {
    if (this.headerElement && this.datePickerContainerElement) {
      const prevMonthButton = this.headerElement.querySelector('.smg-date-picker__left-arrow');
      const restoreClickHandler = this.mode === CalendarMode.Single
        ? this.setDayElementClickHandler
        : this.setRangeModeDayElementClickHandler;

      prevMonthButton?.addEventListener('click', () => handlePrevMonthButtonClick(
        this.anchorElement!,
        this.headerElement!,
        this.datePickerContainerElement!,
        this.localization,
        restoreClickHandler
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

  private setRangeModeDayElementClickHandler = (collection: NodeListOf<Element>) => {
    if (this.anchorElement && this.firstOutputElement) {
      collection.forEach((dayElement) => {
        dayElement.addEventListener('click', () => handleRangeModeDayElementClick(
          this.anchorElement!,
          this.firstOutputElement!,
          this.secondOutputElement!,
          dayElement,
          collection
        ));
      });
    }
  };

  private setClearButtonClickHandler = (
    firstOutputElementInitialValue: string | null | undefined,
    secondOutputElementInitialValue: string | null | undefined
  ) => {
    if (this.anchorElement && this.firstOutputElement && this.secondOutputElement && this.calendarControls) {
      const clearButton = this.calendarControls.querySelector('.smg-date-picker__clear-button');

      clearButton?.addEventListener('click', () => handleClearButtonClick(
        this.anchorElement!,
        this.firstOutputElement!,
        this.secondOutputElement!,
        firstOutputElementInitialValue,
        secondOutputElementInitialValue
      ));
    }
  };

  private setApplyButtonClickHandler = () => {
    if (this.anchorElement && this.firstOutputElement && this.secondOutputElement && this.calendarControls) {
      const applyButton = this.calendarControls.querySelector('.smg-date-picker__apply-button');

      applyButton?.addEventListener('click', () => handleApplyButtonClick(
        this.anchorElement!,
        this.datePickerElement!,
        this.callback
      ));
    }
  };
}
