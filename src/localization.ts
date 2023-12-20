import {Localization} from './enums/localization.enum';

export enum EnglishMonths {
  January = 'January',
  February = 'February',
  March = 'March',
  April = 'April',
  May = 'May',
  June = 'June',
  July = 'July',
  August = 'August',
  September = 'September',
  October = 'October',
  November = 'November',
  December = 'December'
}

export enum EnglishWeekdays {
  Mon = 'Mon',
  Tue = 'Tue',
  Wed = 'Wed',
  Thu = 'Thu',
  Fri = 'Fri',
  Sat = 'Sat',
  Sun = 'Sun'
}

export enum RussianMonths {
  January = 'Январь',
  February = 'Февраль',
  March = 'Март',
  April = 'Апрель',
  May = 'Май',
  June = 'Июнь',
  July = 'Июль',
  August = 'Август',
  September = 'Сентябрь',
  October = 'Октябрь',
  November = 'Ноябрь',
  December = 'Декабрь'
}

export enum RussianWeekdays {
  Mon = 'Пн',
  Tue = 'Вт',
  Wed = 'Ср',
  Thu = 'Чт',
  Fri = 'Пт',
  Sat = 'Сб',
  Sun = 'Вс'
}

export const Lang = {
  [Localization.Eng]: {
    months: EnglishMonths,
    weekdays: EnglishWeekdays
  },
  [Localization.Ru]: {
    months: RussianMonths,
    weekdays: RussianWeekdays
  }
};
