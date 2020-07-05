import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

export interface Training {
  id?: string,
  name: string,
  distance: number,
  velocity: number
}

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
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

  getTrainings(): Observable<Training[]> {
    return this.trainings;
  }

  getTrainingById(id: string): Observable<Training> {
    return this.trainingCollection.doc<Training>(id).valueChanges().pipe(
      take(1),
      map(idea => {
        idea.id = id;
        return idea
      })
    );
  }

  addTraining(training: Training): Promise<DocumentReference> {
    return this.trainingCollection.add(training);
  }

  updateTraining(training: Training): Promise<void> {
    return this.trainingCollection.doc(training.id).update({ name: training.name, distance: training.distance, velocity: training.velocity });
  }

  deleteTraining(id: string): Promise<void> {
    return this.trainingCollection.doc(id).delete();
  }
}
