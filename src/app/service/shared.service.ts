import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public victimLocation:L.LatLngExpression[]=[]
  public locationTitles:string[]=[]
  constructor() { }

  setVictimLocation(data:L.LatLngExpression[],locationTitles:string[]){
    this.victimLocation=data
    this.locationTitles=locationTitles
  }
  getVictimLocation(){
    return this.victimLocation
  }
  getLocationTitles(){
    return this.locationTitles
  }
}
