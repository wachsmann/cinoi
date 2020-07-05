import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { map, take } from 'rxjs/operators';

const TOKEN_KEY = 'auth-token';

export interface User {
  email: '';
  password: '';
}

export interface LoginUser {
  email: string;
  height: number;
  name: string;
  password: string;
  weight: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);
  user: LoginUser;
  constructor(private afs: AngularFirestore, private storage: Storage, private plt: Platform) {
    this.user = null;
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(userId => {
      if (!userId)
        return;

      this.authenticationState.next(true);
    });
  }

  getUser(): Promise<LoginUser> {
    return new Promise<LoginUser>((resolve) => {
      this.storage.get('user').then((user: LoginUser) => {
        resolve(user);
      });
    });
  }

  login(userId) {
    return this.storage.set(TOKEN_KEY, userId).then(() => {
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
          this.storage.set('user', a.payload.doc.data());
          const id = a.payload.doc.id;
          return { id };
        });
      })
    );
  }
}


