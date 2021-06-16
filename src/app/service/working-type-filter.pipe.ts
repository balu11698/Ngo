import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'workingTypeFilter'
})
export class WorkingTypeFilterPipe implements PipeTransform {

  transform(items: any, workingType: any){
    if (workingType === "All" || workingType == undefined) {
      return items;
    }
    else {
      return items.filter((it: any) => {
        return it.workingType === workingType
      })
    }
  }

}
