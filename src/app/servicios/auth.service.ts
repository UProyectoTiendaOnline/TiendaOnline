import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { map} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Injectable()
export class AuthService {
  private _user = new Subject<any>();
  user = this._user.asObservable();

  constructor(
    private _firebaseAuth: AngularFireAuth,
    private _router: Router
  ) {
    this._firebaseAuth.authState.subscribe(user => {
      let dataToSave = (user) ? JSON.stringify(user) : null;
      this._user.next(user);

      localStorage.setItem('user', dataToSave);
      JSON.parse(localStorage.getItem('user'));
    });
  }

  isLoggedIn() {
    if (this.user == null) {
      return false;
    } else {
      return true;
    }
  }

  loginTwitter() {
    return this._firebaseAuth.auth.signInWithPopup( new firebase.auth.TwitterAuthProvider());
  }

  loginFacebook() {
    return this._firebaseAuth.auth.signInWithPopup( new firebase.auth.FacebookAuthProvider());
  }

  loginGoogle() {
    return this._firebaseAuth.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider());
  }

  registerUser(email: string, pass: string, redirectTo: string = '/') {
    return new Promise((resolve, reject) => {
      this._firebaseAuth.auth.createUserWithEmailAndPassword(email, pass)
      .then(userData => {
          this._router.navigate([redirectTo]);
          resolve(userData);
        }, err => reject (err));
    });
  }

  loginEmail(email: string, pass: string, redirectTo: string = '/') {
    return new Promise((resolve, reject) => {
      this._firebaseAuth.auth.signInWithEmailAndPassword(email, pass)
        .then(userData => {
          this._router.navigate([redirectTo]);
          resolve(userData);
        }, err => reject (err));
    });
  }

  getAuth() {
    return this._firebaseAuth.authState.pipe(map(auth => auth));
  }

  logout() {
    return this._firebaseAuth.auth.signOut()
      .then((res) => this._router.navigate(['/']));
  }

}