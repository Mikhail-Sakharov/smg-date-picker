import {CalendarPresenter} from './calendar-presenter';
import {CalendarMode} from './enums/calendar-mode.enum';
import {Localization} from './enums/localization/localization.enum';

export class SMGDatePicker {
  constructor(
    private anchorElement: HTMLElement | null = null,
    private firstOutputElement: HTMLElement | null = null,
    private secondOutputElement: HTMLElement | null = null,
    private mode = CalendarMode.Single,
    private localization = Localization.Eng,
    private callback: (startDate: string, finishDate?: string) => void | null
  ) {}

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
