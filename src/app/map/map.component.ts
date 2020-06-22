import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as leaflet from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

  map: any;
  userLocation = {};


  constructor() { }

  ngOnInit(): void {
  }

  // map object (id map) needs to exist in DOM before reference, thus must be assigned after init
  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap(): void {

    // set starting location of map
    this.map = leaflet.map('mapDOM', { zoom: 5, zoomControl: false });

    // make map tiles and add to map object
    const tiles = leaflet.tileLayer(
      // 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg',
      {
        maxZoom: 20,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> | Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a> | <a href="https://icons8.com/icon/sawhtsYuLGVN/brake-pad-warning">Brake Pad Warning icon by Icons8</a>'
      }
    );

    tiles.addTo(this.map);

    // add zoom control in top right
    let zoom = leaflet.control.zoom({position: 'topright'});
    zoom.addTo(this.map);

    // set map to center on user's current location
    this.map.locate({ setView: true, maxZoom: 10 });

    // set people icons
    let personIcon = leaflet.icon({
      iconUrl: 'assets/icon.png',
      iconSize: [50, 50],
      iconAnchor: [25, 25]
    });

    let marker = leaflet.marker([49.228468, -123.159505], {icon: personIcon});
    
    marker.addTo(this.map);

    // TODO: add popup for each person
    

  }

}
