import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'openCaseFilter'
})
export class OpenCaseFilterPipe implements PipeTransform {

  transform(items:any[],openCase:string) {
    console.log(openCase)
    if(openCase==="All" || openCase==undefined){
      return items
    }
    else if(openCase==="Yes"){
      return items.filter((it)=>{
        return it.isSolved=="Yes"
      })
    }
    else{
      return items.filter((it)=>{
        return it.isSolved=="No"
      })
    }
  }

}
