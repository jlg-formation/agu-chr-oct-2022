import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis',
})
export class EllipsisPipe implements PipeTransform {
  transform(value: unknown, maxLength = 10): unknown {
    if (typeof value !== 'string') {
      return value;
    }
    if (value.length > maxLength) {
      return value.substring(0, maxLength) + '...';
    }
    return value;
  }
}
