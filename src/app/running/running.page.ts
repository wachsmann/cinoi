import { Component, OnInit } from '@angular/core';
import {Platform} from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,  
  GoogleMapsEvent,
  GoogleMapOptions,
  Marker,
  LatLng,
  Environment,
  Polyline} from '@ionic-native/google-maps/ngx';
  import { Geolocation } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-running',
  templateUrl: './running.page.html',
  styleUrls: ['./running.page.scss'],
})
export class RunningPage implements OnInit {

  private distance: string = "5,80";
  private time: string = "00:30:12";
  private calories: number = 670;
  private average_speed: string = "5,80";
  private target_speed: number = 10;
  marker: Marker;
  map: GoogleMap;
  loading: any;
  coursePolyline: Polyline;
  courseCoordinates = [
    {lat: 35.548852, lng: 139.784086},
    {lat: 37.615223, lng: -122.389979},
    {lat: 21.324513, lng: -157.925074},
  ]
  constructor(private platform:Platform,private geolocation: Geolocation) {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      if(resp.coords){
        let latLng = new LatLng(resp.coords.latitude,resp.coords.longitude)
        if(this.marker)
          this.marker.setPosition(latLng)
        this.map.setCameraTarget(latLng)
      }
        
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
      if(data.coords){
        
        let latLng = new LatLng(data.coords.latitude,data.coords.longitude)
      
        this.marker.setPosition(latLng)
        this.map.setCameraTarget(latLng)
        this.courseCoordinates.push({lat:data.coords.latitude,lng:data.coords.longitude})
        
        if(this.coursePolyline){
          this.coursePolyline.empty()
          this.coursePolyline.setPoints(this.courseCoordinates)
        }

      }
     });
   }

  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap()
    
  }

  loadMap() {

    // This code is necessary for browser
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyBJIInuabmDNon1kJy-MjI_e1Pq7PA-i5M`)',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyBJIInuabmDNon1kJy-MjI_e1Pq7PA-i5M`)'
    });

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: 43.0741904,
           lng: -89.3809802
         },
         zoom: 18,
         tilt: 30
       }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    this.marker = this.map.addMarkerSync({
      title: 'Ionic',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: 43.0741904,
        lng: -89.3809802
      }
    });
    this.marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });

    this.courseCoordinates = [
      {lat: 35.548852, lng: 139.784086},
      {lat: 37.615223, lng: -122.389979},
      {lat: 21.324513, lng: -157.925074},
    ];
    this.coursePolyline = this.map.addPolylineSync({
      points: this.courseCoordinates,
      strokeColor: '#FF0000',
      width: 5,
      geodesic: true,
      
    });
  
  }


}
