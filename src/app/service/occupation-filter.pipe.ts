import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'occupationFilter'
})
export class OccupationFilterPipe implements PipeTransform {

  transform(items:any[],occupation:string) {
    console.log(occupation)
    if(occupation==undefined || occupation=="All"){
      return items
    }
    else {
      return items.filter((it) => {
        return it.occupation == occupation
      })
    }

  }

}
