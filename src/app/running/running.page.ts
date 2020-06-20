import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-running',
  templateUrl: './running.page.html',
  styleUrls: ['./running.page.scss'],
})
export class RunningPage implements OnInit {

  public distance = '5,80';
  public time = '00:30:12';
  public calories = 670;
  public average_speed = '5,80';
  public target_speed = 10;
  loading: any;

  constructor() { }

  ngOnInit() {
    // await this.loadMap();
  }

  loadMap() {
    // this.map = GoogleMaps.create('map_canvas', {
    //   camera: {
    //     target: {
    //       lat: 43.0741704,
    //       lng: -89.3809802
    //     },
    //     zoom: 18,
    //     tilt: 30
    //   }
    // });

  }

}
