import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TrainingService, Training } from 'src/app/service/training.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.scss'],
})
export class TrainingListComponent implements OnInit {
  private trainings: Observable<Training[]>;

  @Output() OnInitUpdate: EventEmitter<void> = new EventEmitter();
  @Output() OnFinishUpdate: EventEmitter<void> = new EventEmitter();
  @Output() OnTrainingClick: EventEmitter<Training> = new EventEmitter();
  constructor(private trainingsService: TrainingService) { }

  ngOnInit() { }
  update(): void {
    this.OnInitUpdate.emit();
    setTimeout(() => {
      this.trainings = this.trainingsService.getTrainings();
      this.OnFinishUpdate.emit();
    }, 1000);
  }
}
