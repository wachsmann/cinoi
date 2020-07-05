import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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
  id: string;
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
  private user: LoginUser;
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

      this.storage.get('user').then(user => {
        this.user = user;
        this.authenticationState.next(true);
      });
    });
  }

  getUser(): LoginUser {
    return this.user;
  }

  login(user: LoginUser) {
    return this.storage.set(TOKEN_KEY, user.id)
    .then(() => this.storage.set('user', user))
    .then(() => {
      this.user = user;
      this.authenticationState.next(true);
    });
  }

  logout() {
    return this.storage.remove(TOKEN_KEY)
    .then(() => this.storage.remove('user'))
    .then(() => this.authenticationState.next(false));
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  checkUser(user: User): any {
    return this.afs.collection(`user`,
      ref => ref.where('email', '==', user.email)
        .where('password', '==', user.password)).snapshotChanges().pipe(
          take(1),
          map(actions => {
            return actions.map(a => {
              const id = a.payload.doc.id;
              const userData: any = a.payload.doc.data();
              userData.id = id;
              return { userData };
            });
          }));
  }
}


