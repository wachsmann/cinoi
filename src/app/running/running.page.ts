import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-running',
  templateUrl: './running.page.html',
  styleUrls: ['./running.page.scss'],
})
export class RunningPage implements OnInit {
  @ViewChild('sliderRef', { static: true }) protected slides: IonSlides;
  public distance = '5,80';
  public time = '00:30:12';
  public calories = 670;
  public average_speed = '5,80';
  public target_speed = 10;
  loading: any;
  constructor() { }

  ngOnInit() {
    this.slides.update();
  }

}
