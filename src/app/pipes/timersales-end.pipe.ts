import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timersalesEnd'
})
export class TimersalesEndPipe implements PipeTransform {

  transform(value: number): number {
    return value;
  }

}
