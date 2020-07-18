/*
// movie-pipe.pipe.ts
// author: André Fillype (06/01/2019)
// desc: functions to transform movies properties
*/

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupByMoviePipe'
})
export class GroupByMoviePipe implements PipeTransform {

  transform(value: Array<any>, field: string): Array<any> {
    const groupedObj = value.reduce((prev, cur)=> {
      if(!prev[cur[field]]) {
        prev[cur[field]] = [cur];
      } else {
        prev[cur[field]].push(cur);
      }
      return prev;
    }, {});
    return Object.keys(groupedObj).map(key => ({ key, value: groupedObj[key] }));
  }

}
