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
    this.map = leaflet.map('mapDOM', { zoom: 5 });

    // make map tiles and add to map object
    const tiles = leaflet.tileLayer(
      // 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg',
      {
        maxZoom: 20,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://icons8.com/icon/sawhtsYuLGVN/brake-pad-warning">Brake Pad Warning icon by Icons8</a>'
      }
    );

    tiles.addTo(this.map);

    this.map.locate({ setView: true, maxZoom: 13 });

    let personIcon = leaflet.icon({
      iconUrl: 'assets/icon.png',
      iconSize: [50, 50],
      iconAnchor: [25, 25]
    });

    let marker = leaflet.marker([49.228468, -123.159505], {icon: personIcon});
    
    marker.addTo(this.map);

  }

}
