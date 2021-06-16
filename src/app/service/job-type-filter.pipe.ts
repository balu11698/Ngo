import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jobTypeFilter'
})
export class JobTypeFilterPipe implements PipeTransform {

  transform(items:any, jobType:any) {
    if (jobType === "All" || jobType == undefined) {
      return items;
    }
    else {
      return items.filter((it: any) => {
        return it.jobType === jobType
      })
    }
  }

}
