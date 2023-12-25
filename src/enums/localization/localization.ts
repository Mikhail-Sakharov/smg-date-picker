import {Localization} from './localization.enum';
import {EnglishControls} from './english/english-controls.enum';
import {EnglishMonths} from './english/english-months.enum';
import {EnglishWeekdays} from './english/english-weekdays.enum';
import {RussianControls} from './russian/russian-controls.enum';
import {RussianMonths} from './russian/russian-months.enum';
import {RussianWeekdays} from './russian/russian-weekdays';

export const Lang = {
  [Localization.Eng]: {
    months: EnglishMonths,
    weekdays: EnglishWeekdays,
    controls: EnglishControls
  },
  [Localization.Ru]: {
    months: RussianMonths,
    weekdays: RussianWeekdays,
    controls: RussianControls
  }
};
