import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stateFilter'
})
export class StateFilterPipe implements PipeTransform {

  transform(items: any[], state: string) {
    console.log(state, "state");
    if (state == undefined || state=="All") {
      return items
    }
    else {
      return items.filter((it) => {
        return it.state == state
      })
    }
  }

}
