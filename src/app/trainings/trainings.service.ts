import { Injectable } from '@angular/core';
import Training from './training.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingsService {
  private trainings: Array<Training> = [];
  constructor() { }

  get(): Array<Training> {
    return this.trainings;
  }
  add(newTraining: Training): Training {
    if (newTraining.id === -1){
      newTraining.id = this.trainings.length + 1;
    }
    this.trainings.push(newTraining);
    return newTraining;
  }
  set(training: Training): void {
    this.trainings.forEach((trainingVal: Training, idx: number) => {
      if (training.id === trainingVal.id){
        this.trainings[idx] = training;
      }
    });
  }
  del(trainingId: number): void {
    this.trainings.forEach((trainingVal: Training, idx: number) => {
      if (trainingVal.id === trainingId){
        this.trainings.splice(idx, 1);
      }
    });
  }

}
