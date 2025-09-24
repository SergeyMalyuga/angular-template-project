import {Pipe, PipeTransform} from '@angular/core';
import dayjs from 'dayjs';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string, dateTime?: boolean) {
    if (!value) return '';
    if(dateTime) {
      return dayjs(value).format('YYYY-MM-DD');
    }
    return dayjs(value).format('MMMM YYYY');
  }
}
