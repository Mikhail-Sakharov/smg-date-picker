import {CalendarData} from './interfaces/calendar-data.interface';
import {HeaderData} from './interfaces/header-data.interface';

import {createCalendarData} from './data-generator/create-calendar-data';

export class CalendarModel {
  private calendarData: CalendarData[] = [];
  private headerData!: HeaderData;

  constructor(month = (new Date()).getMonth(), year = (new Date()).getFullYear()) {
    this.createData(month, year);
  }

  public getCalendarData = () => {
    return this.calendarData;
  };

  public getHeaderData = () => {
    return this.headerData;
  };

  private createData = (currentMonth: number, currentYear: number) => {
    const data = createCalendarData(currentMonth, currentYear);
    this.calendarData = data;
    this.headerData = {
      currentMonth,
      currentYear
    };
  };
}
