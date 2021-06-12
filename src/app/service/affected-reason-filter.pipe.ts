import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'affectedReasonFilter'
})
export class AffectedReasonFilterPipe implements PipeTransform {

  transform(items:any[],affectedReason:string){
    if (affectedReason == undefined || affectedReason=="All") {
      return items
    }
    else {
      return items.filter((it) => {
        return it.affectedReason == affectedReason
      })
    }
  }

}
