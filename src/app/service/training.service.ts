import { AuthenticationService, LoginUser } from './authentication.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

export interface Training {
  id?: string;
  name: string;
  distance: number;
  velocity: number;
}

interface TrainingFirebaseModel {
  id?: string;
  name: string;
  distance: number;
  velocity: number;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private trainings: Observable<Training[]>;
  private trainingCollection: AngularFirestoreCollection<TrainingFirebaseModel>;
  private user: LoginUser;

  constructor(private afs: AngularFirestore, private authService: AuthenticationService) {
    this.user = this.authService.getUser();
    this.trainingCollection = this.afs.collection<TrainingFirebaseModel>('training', ref => ref.where('userId', '==', this.user.id));
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
        const training: Training = {
          id,
          distance: idea.distance,
          velocity: idea.velocity,
          name: idea.name
        };
        return training;
      })
    );
  }

  addTraining(training: Training): Promise<DocumentReference> {
    const modelTraining: TrainingFirebaseModel = {
      distance: training.distance,
      velocity: training.velocity,
      name: training.name,
      userId: this.user.id
    };
    return this.trainingCollection.add(modelTraining);
  }

  updateTraining(training: Training): Promise<void> {
    return this.trainingCollection
      .doc(training.id)
      .update({
        name: training.name,
        distance: training.distance,
        velocity:
          training.velocity,
        userId: this.user.id
      });
  }

  deleteTraining(id: string): Promise<void> {
    return this.trainingCollection.doc(id).delete();
  }
}
