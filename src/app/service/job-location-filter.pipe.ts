import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jobLocationFilter'
})
export class JobLocationFilterPipe implements PipeTransform {

  transform(items: any, jobLocation: any) {
    if (jobLocation === "All" || jobLocation == undefined) {
      return items;
    }
    else {
      return items.filter((it: any) => {
        return it.jobLocation === jobLocation
      })
    }
  }

}
