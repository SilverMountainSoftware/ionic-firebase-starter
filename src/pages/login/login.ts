import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { MainPage } from '../../pages/pages';
import { User } from '../../providers/user';
import { TranslateService } from '@ngx-translate/core';

import { UserApi } from '../../providers/user-api';
import { UserService } from '../../providers/user.service';
import * as firebase from 'firebase/app';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'test@example.com',
    password: 'test'
  };

  isAuth = false;
  authColor = 'warn';
  user: firebase.User;
  submitting = false;
  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    ////public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private userApi: UserService) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  login(from: string) {
    this.userApi.signIn(from)
      .subscribe((user) => {
        this._changeState(user);
      },
      (err) => {
        this.submitting = false;
        console.log('got error: ', err);
      });
  }

  logout() {
    this.userApi.signOut();
  }

  private _changeState(user: firebase.User = null) {
    if (user) {
      this.isAuth = true;
      this.authColor = 'primary';
      this.user = this._getUserInfo(user);
      ////this.router.navigate(['/authenticated']);
      this.navCtrl.push(MainPage);
    } else {
      this.isAuth = false;
      this.authColor = 'warn';
      this.user = null;
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
  }

  private _getUserInfo(user: firebase.User): any {
    if (!user) {
      return {};
    }
    return {
      name: user.displayName,
      avatar: user.photoURL,
      email: user.email,
      provider: user.providerId
    };
  }

  // Attempt to login in through our User service
  doLogin() {
    // // this.user.login(this.account).subscribe((resp) => {
    // //   this.navCtrl.push(MainPage);
    // // }, (err) => {
    // //   this.navCtrl.push(MainPage);
    // //   // Unable to log in
    // //   let toast = this.toastCtrl.create({
    // //     message: this.loginErrorString,
    // //     duration: 3000,
    // //     position: 'top'
    // //   });
    // //   toast.present();
    // // });
  }
}
