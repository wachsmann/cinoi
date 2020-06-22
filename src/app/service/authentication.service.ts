import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { map, take } from 'rxjs/operators';

const TOKEN_KEY = 'auth-token';

export interface User {
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  constructor(private afs: AngularFirestore, private storage: Storage, private plt: Platform) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    })
  }

  login(id_user) {
    return this.storage.set(TOKEN_KEY, id_user).then(() => {
      this.authenticationState.next(true);
    });
  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  checkUser(user: User): any {
    return this.afs.collection(`user`, ref => ref.where('email', "==", user.email).where('password', '==', user.password)).snapshotChanges().pipe(
      take(1),
      map(actions => {
        return actions.map(a => {
          const id = a.payload.doc.id;
          return { id };
        });
      })
    );
  }
}


