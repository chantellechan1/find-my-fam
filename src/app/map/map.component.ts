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
  userIcon = leaflet.icon({
    iconUrl: 'assets/self-icon.png',
    iconSize: [50, 50], iconAnchor: [25, 25]
  });

  personIcon = leaflet.icon({
    iconUrl: 'assets/icon.png',
    iconSize: [50, 50], iconAnchor: [25, 25]
  });

  constructor() { }

  ngOnInit(): void {
  }

  // map object (id map) needs to exist in DOM before reference, thus must be assigned after init
  ngAfterViewInit(): void {
    this.initMap();
    this.addMarkers();
    // TODO: add popup for each person

  }

  initMap(): void {
    // set starting location of map
    this.map = leaflet.map('mapDOM', { zoom: 4, zoomControl: false });

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
    let zoom = leaflet.control.zoom({ position: 'topright' });
    zoom.addTo(this.map);

    // set map to center on user's current location
    this.map.locate({ setView: true, maxZoom: 4 });
  }

  async addMarkers() {
    // add user's marker at current location
    let userlatlon = await this.getUserLocation();
    let userMarker = leaflet.marker(userlatlon, { icon: this.userIcon });

    userMarker.addTo(this.map);

    // mock data for other people locations
    let peopleLocations = [
      {name: 'Karen Crane', relationship: 'Mom', city: 'Tofino', country: 'Canada', coords: {lat: 49.145248, lon: -125.891357}},
      {name: 'Lyndon Chan', relationship: 'Dad', city: 'Tofino', country: 'Canada', coords: {lat: 49.145248, lon: -125.891357}},
      {name: 'Daeshim Crane', relationship: 'Uncle', city: 'Toronto', country: 'Canada', coords: {lat: 43.653225, lon: -79.383186}},
      {name: 'Kaula Chan', relationship: 'Aunt', city: 'San Diego', country: 'USA', coords: {lat: 32.715736, lon: -117.161087}},
      {name: 'Sagira Crane', relationship: 'Cousin', city: 'Edmonton', country: 'Canada', coords: {lat: 53.544388, lon: -113.490929}},
      {name: 'Bryan Chan', relationship: 'Brother', city: 'Calgary', country: 'Canada', coords: {lat: 50.970970, lon: -114.043988}},
      {name: 'Nicole Kaper', relationship: 'Sister in Law', city: 'Calgary', country: 'Canada', coords: {lat: 50.970970, lon: -114.043988}},
      {name: 'Staffan Nilsson', relationship: 'Brother in Law', city: 'Toronto', country: 'Canada', coords: {lat: 43.691, lon: -79.330878}},
      {name: 'Gwendolyn Chan', relationship: 'Sister', city: 'Toronto', country: 'Canada', coords: {lat: 43.691, lon: -79.330878}},
      {name: 'Radek Cerny', relationship: 'Cousin', city: 'Zurich', country: 'Switzerland', coords: {lat: 47.370244, lon: 8.518059}},
      {name: 'Sage Johnston', relationship: 'Cousin', city: 'Miami', country: 'USA', coords: {lat: 25.759879, lon: -80.252840}},
      {name: 'Hazell Mosley', relationship: 'Cousin', city: 'St. John\'s', country: 'Canada', coords: {lat: 47.579418, lon: -52.718021}}
    ];

    // loop through people and add markers for each
    for (let person of peopleLocations) {
      let marker = leaflet.marker(person.coords, {icon: this.personIcon});
      marker.addTo(this.map);
    }
  }

  async getUserLocation() {
    // default to city of vancouver coordinates
    let res = {lat: 49.282, lon: -123.116};

    try {
      const position = await this.getCoordinates();
      res = {
        lat: (position as any).coords.latitude,
        lon: (position as any).coords.longitude
      };
    } catch (err) {
      console.log(err);
    }

    return res;

  }

  // wrapper function for Geolocation API get current position for use with async/await
  // docs here: https://stackoverflow.com/questions/51843227/how-to-use-async-wait-with-html5-geolocation-api
  getCoordinates() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

}