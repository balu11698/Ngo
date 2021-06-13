import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  private map!: L.Map;
  private centroid: L.LatLngExpression = [42.3601, -71.0589]; //
  private locationTitles:string[]=[]

  private victimLocation:L.LatLngExpression[]=[]

  getPosition(): Promise<any>
  {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });

  }
  private initMap(): void {
   
    var greenIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 12
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 10,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
    for (let i in this.victimLocation){
      const marker=L.marker(this.victimLocation[i],{title:this.locationTitles[i],icon:greenIcon})
      marker.addTo(this.map)
    }

     const marker = L.marker(this.centroid);
  //   tiles.addTo(this.map);

    marker.addTo(this.map)
  
  }

  constructor(private shared:SharedService) { }

  ngOnInit(): void {
    this.victimLocation=this.shared.getVictimLocation()
    this.locationTitles=this.shared.getLocationTitles()
    this.getPosition().then(pos=>
      {
         this.centroid=[pos.lat,pos.lng]
         this.initMap();

      })
     

  }
  


  

}