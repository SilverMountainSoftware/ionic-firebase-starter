import { Injectable }     from '@angular/core';
import { CanActivate, CanActivateChild }    from '@angular/router';
import { UserService } from './user.service';

import { NavController, ToastController } from 'ionic-angular';
import { MainPage } from '../pages/pages';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(public navCtrl: NavController,
                private userService: UserService) {}

    canActivate(): boolean {
        console.log('AuthGuard#canActivate called ' + this.userService.isAuthenticated );

        if (!this.userService.isAuthenticated) {
            console.log('not auth');
            this.navCtrl.push(MainPage);
            ////this.router.navigate(['/signin']);
        }
        return this.userService.isAuthenticated;
    }

    canActivateChild(): boolean {
        return this.canActivate();
    }
}