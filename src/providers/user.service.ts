import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AuthProvider } from 'firebase/auth';
import { Observable } from 'rxjs/Rx';
import { UserApi } from '../interfaces/user-api';
import { MyUserData } from '../models/my-user-data';
////import { NavController } from 'ionic-angular';
import { MainPage } from '../pages/pages';

@Injectable()
export class UserService implements UserApi {
  isAuthenticated = false;
  userData: MyUserData;
  user: Observable<firebase.User>;

  constructor(////public navCtrl: NavController,
                public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  signIn(from: string) {
    this.afAuth.auth.signInWithPopup(this.getProvider(from));
    this.user.subscribe((auser) => {
      this._changeState(auser);
    },
      (err) => {
        console.log('signIn error: ', err);
      });

    return this.user;
  }

  private getProvider(from: string): AuthProvider {
    switch (from) {
      case 'twitter': return new firebase.auth.TwitterAuthProvider();
      case 'facebook': return new firebase.auth.FacebookAuthProvider();
      case 'github': return new firebase.auth.GithubAuthProvider();
      case 'google': return new firebase.auth.GoogleAuthProvider();
    }
  }

  private _changeState(auser: firebase.User = null) {
    if (auser) {
      this.userData = this._getUserInfo(auser);
      this.isAuthenticated = true;
    } else {
      this.userData = new MyUserData();
    }
  }

  private _getUserInfo(auser: firebase.User): any {
    if (!auser) {
      return {};
    }
    return {
      uid: auser.uid,
      name: auser.displayName,
      avatar: auser.photoURL,
      email: auser.email,
      provider: auser.providerId
    };
  }

  userName(): string {
    return this.userData.name;
  }

  signOut(): Observable<any> {
    this.isAuthenticated = false;
    ////this.navCtrl.push(MainPage);
    return Observable.of({});
  }
}
