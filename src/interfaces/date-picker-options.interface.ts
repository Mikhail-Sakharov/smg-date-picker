import {CalendarMode} from '../calendar-mode.enum';
import {Localization} from '../localization.enum';

export interface DatePickerOptions {
  anchorElement: Element;
  firstOutputElement: Element;
  secondOutputElement?: Element;
  mode?: CalendarMode;
  localization?: Localization;
  callback?: (startDate: string, finishDate?: string) => void;
}
