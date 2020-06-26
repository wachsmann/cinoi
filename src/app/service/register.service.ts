import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';

export interface User {
  email: string,
  height: string,
  name: string,
  password: string,
  weight: number
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private userCollection: AngularFirestoreCollection<User>;

  constructor(private afs: AngularFirestore) {
    this.userCollection = this.afs.collection<User>('user');
  }

  addUser(user: User): Promise<DocumentReference> {
    return this.userCollection.add(user);
  }
}