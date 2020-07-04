import { Injectable } from '@angular/core';
import Training from './training.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrainingsService {
  private trainings: Observable<Training[]>;
  private trainingCollection: AngularFirestoreCollection<Training>;

  constructor(private afs: AngularFirestore) {
    this.trainingCollection = this.afs.collection<Training>('training');
    this.trainings = this.trainingCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  private trainingse: Array<Training> = [
    {
      distance: 10,
      id: 1,
      name: 'Teste de Treino',
      velocity: 5
    }
  ];

  get(): Array<Training> {
    return this.trainingse;
  }
  add(newTraining: Training): Training {
    if (newTraining.id === -1) {
      newTraining.id = this.trainingse.length + 1;
    }
    this.trainingse.push(newTraining);
    return newTraining;
  }
  set(training: Training): void {
    this.trainingse.forEach((trainingVal: Training, idx: number) => {
      if (training.id === trainingVal.id) {
        this.trainingse[idx] = training;
      }
    });
  }
  del(trainingId: number): void {
    this.trainingse.forEach((trainingVal: Training, idx: number) => {
      if (trainingVal.id === trainingId) {
        this.trainingse.splice(idx, 1);
      }
    });
  }

}
