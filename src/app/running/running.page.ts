import { Component, OnInit } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
} from '@ionic-native/google-maps';

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
  map: GoogleMap;
  loading: any;

  constructor() { }

  async ngOnInit() {
    await this.loadMap()
  }

  loadMap() {
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: 43.0741704,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    });

  }

}
