import {CalendarMode} from './enums/calendar-mode.enum';
import {Localization} from './enums/localization.enum';

import {CalendarModel} from './calendar-model';
import {CalendarView} from './calendar-view';

import {handleDocumentKeydown} from './handlers/keydown.handler';
import {handleOutsideDatePickerClick} from './handlers/outside-date-picker-click.handler';

export class CalendarPresenter {
  constructor(
    private anchorElement: HTMLElement | null = null,
    private firstOutputElement: HTMLElement | null = null,
    private secondOutputElement: HTMLElement | null = null,
    private mode = CalendarMode.Single,
    private localization = Localization.Eng,
    private callback = null
  ) {}

  public init = () => {};

  private handleAnchorElementClick = (datePickerElement: HTMLElement) => {
    datePickerElement.classList.toggle('opened');
  };

  public create = () => {
    if (this.anchorElement) {
      const calendarModel = new CalendarModel();
      const calendarData = calendarModel.getCalendarData();
      const headerData = calendarModel.getHeaderData();

      this.anchorElement.classList.add('smg-date-picker-anchor');

      const rangeOptions = {
        anchorElementDateValue: this.anchorElement.getAttribute('data-date'),
        anchorElementStartDateValue: this.anchorElement.getAttribute('data-start-date'),
        anchorElementFinishDateValue: this.anchorElement.getAttribute('data-finish-date')
      };
      
      const calendarView = new CalendarView(
        this.localization,
        calendarData,
        headerData,
        this.anchorElement,
        this.firstOutputElement
      );
      const datePickerElement = calendarView.build(rangeOptions);

      this.anchorElement.addEventListener('click', () => this.handleAnchorElementClick(datePickerElement));
      document.addEventListener('click', (evt) => handleOutsideDatePickerClick(
        evt,
        this.anchorElement!,
        datePickerElement
      ));
      document.addEventListener('keydown', (evt) => handleDocumentKeydown(evt, datePickerElement));

      this.anchorElement.after(datePickerElement);
    }
  };
}
