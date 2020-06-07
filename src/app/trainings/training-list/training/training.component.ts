import { Component, OnInit, Input } from '@angular/core';
import Training from '../../training.model';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  @Input() public training: Training;
  constructor() { }

  ngOnInit() {}

}
