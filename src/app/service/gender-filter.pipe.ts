import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderFilter'
})
export class GenderFilterPipe implements PipeTransform {

  transform(items:any[],gender:string) {
    if(gender==="All" || gender==undefined){
      return items;
    }
    else if(gender==="Male"){
      return items.filter((it)=>{
        return it.gender==="Male"
      })
    }
    else{
      return items.filter((it)=>{
        return it.gender==="Female"
      })
    }
  }

}
