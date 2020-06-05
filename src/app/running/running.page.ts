import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() { }
}
