import {CalendarPresenter} from './calendar-presenter';
import {CalendarMode} from './enums/calendar-mode.enum';
import {Localization} from './enums/localization/localization.enum';
import {SMGDatePickerInterface} from './interfaces/smg-date-picker.interface';

export class SMGDatePicker {
  private anchorElement: HTMLElement | null = null;
  private firstOutputElement: HTMLElement | null = null;
  private secondOutputElement: HTMLElement | null = null;
  private mode = CalendarMode.Single;
  private localization = Localization.Eng;
  private callback: ((startDate: string, finishDate?: string) => void) | null = null;

  constructor({
    anchorElement,
    firstOutputElement,
    secondOutputElement,
    mode,
    localization,
    callback
  }: SMGDatePickerInterface) {
    this.anchorElement = anchorElement;
    this.firstOutputElement = firstOutputElement;
    this.secondOutputElement = secondOutputElement;
    this.mode = mode;
    this.localization = localization;
    this.callback = callback;
  }

  public create = () => {
    const datePicker = new CalendarPresenter(
      this.anchorElement,
      this.firstOutputElement,
      this.secondOutputElement,
      this.mode,
      this.localization,
      this.callback
    );
    datePicker.create();
  };
}
