import { TrainingsService } from './../trainings.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import Training from '../training.model';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.scss'],
})
export class TrainingListComponent implements OnInit {
  trainings: Array<Training> = [];
  @Output() OnInitUpdate: EventEmitter<any> = new EventEmitter();
  @Output() OnFinishUpdate: EventEmitter<any> = new EventEmitter();
  constructor(private trainingsService: TrainingsService) { }

  ngOnInit() {}
  update(): void {
    this.OnInitUpdate.emit();
    setTimeout(() => {
      this.trainings = this.trainingsService.get();
      this.OnFinishUpdate.emit();
    }, 1000);
  }
}
