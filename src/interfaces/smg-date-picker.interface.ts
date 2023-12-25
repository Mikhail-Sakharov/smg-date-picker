import {CalendarMode} from '../enums/calendar-mode.enum';
import {Localization} from '../enums/localization/localization.enum';

export interface SMGDatePickerInterface {
  anchorElement: HTMLElement | null;
  firstOutputElement: HTMLElement | null;
  secondOutputElement: HTMLElement | null;
  mode: CalendarMode.Single;
  localization: Localization.Eng;
  callback: ((startDate: string, finishDate?: string) => void) | null;
}
