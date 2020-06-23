import { RunningModel } from './model/running.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-running',
  templateUrl: './running.page.html',
  styleUrls: ['./running.page.scss'],
})
export class RunningPage implements OnInit {
  @ViewChild('sliderRef', { static: true }) protected slides: IonSlides;
  // public distance = '5,80';
  public distance = 0;
  public contador: Date = new Date(2000, 1, 1, 0, 0, 0, 0);
  public calories = 670;
  public average_speed = '5,80';
  public target_speed = 10;
  loading: any;
  constructor() {}

  ngOnInit() {
    this.slides.update();
  }

  ionViewDidEnter(){
    setInterval(() => {
      this.contador = new Date(this.contador.setSeconds(this.contador.getSeconds() + 1));
    }, 1000);
  }

}
