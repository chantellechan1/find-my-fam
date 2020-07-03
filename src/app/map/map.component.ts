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

  familyIcon = leaflet.icon({
    iconUrl: 'assets/icon.png',
    iconSize: [50, 50], iconAnchor: [25, 25]
  });

  friendsIcon = leaflet.icon({
    iconUrl: 'assets/friend-icon.png',
    iconSize: [50, 50], iconAnchor: [25, 25]
  })

  // mock data for other people locations
  peopleLocations = [
    { name: 'Karen Crane', institution: 'University of British', relationship: 'Mom', city: 'Tofino', country: 'Canada', coords: { lat: 49.151286, lon: -125.904908 } },
    { name: 'Lyndon Chan', institution: 'UB', relationship: 'Dad', city: 'Tofino', country: 'Canada', coords: { lat: 49.145248, lon: -125.891357 } },
    { name: 'Daeshim Crane', institution: 'UBC', relationship: 'Uncle', city: 'Yellow Knife', country: 'Canada', coords: { lat: 62.405886, lon: -114.363304 }},
    { name: 'Kaula Chan', institution: 'UBC', relationship: 'Aunt', city: 'San Diego', country: 'USA', coords: { lat: 32.715736, lon: -117.161087 } },
    { name: 'Sagira Crane', institution: 'UBC', relationship: 'Cousin', city: 'Edmonton', country: 'Canada', coords: { lat: 53.544388, lon: -113.490929 } },
    { name: 'Bryan Chan', institution: 'UBC', relationship: 'Brother', city: 'Calgary', country: 'Canada', coords: { lat: 50.970970, lon: -114.043988 } },
    { name: 'Radek Cerny', institution: 'UBC', relationship: 'Cousin', city: 'Zurich', country: 'Switzerland', coords: { lat: 47.370244, lon: 8.518059 } },
    { name: 'Nicole Kaper', institution: 'UBC', relationship: 'Sister in Law', city: 'Calgary', country: 'Canada', coords: { lat: 50.870970, lon: -114.043988 } },
    { name: 'Staffan Nilsson', institution: 'UBC', relationship: 'Brother in Law', city: 'Toronto', country: 'Canada', coords: { lat: 43.691, lon: -79.330878 } },
    { name: 'Gwendolyn Chan', institution: 'UBC', relationship: 'Sister', city: 'Toronto', country: 'Canada', coords: { lat: 43.653225, lon: -79.383186 } },
    { name: 'Sage Johnston', institution: 'UBC', relationship: 'Cousin', city: 'Miami', country: 'USA', coords: { lat: 25.759879, lon: -80.252840 } },
    { name: 'Hazell Mosley', institution: 'UBC', relationship: 'Cousin', city: 'St. John\'s', country: 'Canada', coords: { lat: 47.579418, lon: -52.718021 } },
    { name: 'Toribio Merricks',  relationship: 'Friend', city: 'Tokyo', country: 'Japan', coords: { lat: 35.6850, lon: 139.7514 }},
    { name: 'Leire Berkowitz',  relationship: 'Friend', city: 'New York', country: 'USA', coords: { lat: 40.6943, lon: -73.9249}},
    { name: 'Nidia Perez',  relationship: 'Friend', city: 'Mexico City', country: 'Mexico', coords: { lat: 19.4424, lon: -99.1310}},
    { name: 'Ina Trujillo',  relationship: 'Friend', city: 'Mumbai', country: 'India', coords: { lat: 19.0170, lon: 72.88261}},
    { name: 'Kiran Ortega',  relationship: 'Friend', city: 'São Paulo', country: 'Brazil', coords: { lat: -23.5587, lon: -46.6250}},
    { name: 'Michael Whittemore',  relationship: 'Friend', city: 'Canberra', country: 'Australia', coords: { lat: -35.282, lon: 149.128684}},
    { name: 'Alexandros Easom',  relationship: 'Friend', city: 'Brussels', country: 'Belgium', coords: { lat: 50.85034, lon: 4.35171}},
    { name: 'Thorsten Jerome',  relationship: 'Friend', city: 'Dublin', country: 'Ireland', coords: { lat: 53.349805, lon: -6.26031}},
    { name: 'Valdis Eszes',  relationship: 'Friend', city: 'Bucharest', country: 'Romania', coords: { lat: 44.426767, lon: 26.102538}},
    { name: 'Franklyn Cojocaru',  relationship: 'Friend', city: 'Pretoria', country: 'South Africa', coords: { lat: -25.747868, lon: 28.229271}}
  ];

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
    this.map = leaflet.map('mapDOM', { zoom: 4, zoomControl: false, zoomSnap: 0.25, worldCopyJump: true });

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

    // for testing
    this.map.on('click', this.logMapClick);
  }

  async addMarkers() {
    // add user's marker at current location
    let userlatlon = await this.getUserLocation();
    let userMarker = leaflet.marker(userlatlon, { icon: this.userIcon });

    // add popup for user
    let popupOptions = {minWidth: 300, maxWidth: 600}
    let userPopup = leaflet.popup(popupOptions).setContent(
      `
      <div class="container-fluid">
        <div class="row">
            <div class="col-3">
                <img src="assets/profile/user.png" class="rounded float-left img-fluid">
            </div>
            <div class="col-9">
                <div class="row">
                    <h4>Me</h4>
                </div>
                <div class="row"><b>Coordinates: </b> ${userlatlon.lat.toFixed(3)}, ${userlatlon.lon.toFixed(3)}</div>
            </div>
          </div>
      </div>
      `
    );

    userMarker.bindPopup(userPopup);

    userMarker.addTo(this.map);

    // loop through people
    for (let person of this.peopleLocations) {
      
      // add markers for each person
      // by default use the family icon, but change the marker if it is a friend
      let marker = leaflet.marker(person.coords, { icon: this.familyIcon });

      if (person.relationship === 'Friend') {
        marker = leaflet.marker(person.coords, { icon: this.friendsIcon });
      }
      
      // choose person's image out of 12 options
      let imgNum = Math.ceil(Math.random() * 12);

      // add popup for each person
      let popup = leaflet.popup(popupOptions).setContent(
        `
        <div class="container-fluid">
          <div class="row">
              <div class="col-3">
                  <img src="assets/profile/${imgNum}.png" class="rounded float-left img-fluid">
              </div>
              <div class="col-9">
                  <div class="row">
                      <h4>${person.name}</h4>
                  </div>
                  <div class="row"><b>Relationship: </b> ${person.relationship}</div>
                  <div class="row"><b>Location: </b> ${person.city}, ${person.country}</div>
              </div>
            </div>
        </div>
        `
      );

      marker.bindPopup(popup);
      marker.addTo(this.map);
    }
  }

  async getUserLocation() {
    // default to city of vancouver coordinates
    let res = { lat: 49.282, lon: -123.116 };

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

  // for testing
  logMapClick(e) {
    console.log(e.latlng);
  }


}