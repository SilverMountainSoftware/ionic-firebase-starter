import { Routes } from '@angular/router';

//import { AuthenticatedUserComponent } from './authenticated-user/authenticated-user.component';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { SettingsPage } from '../pages/settings/settings'
import { AuthenticatedUserComponent } from '../pages/authenticated-user-component/authenticated-user-component'
import { AuthGuard } from '../providers/auth-guard.service';

export const appRoutes: Routes = [
  { path: 'login', component: LoginPage },
  { path: 'signup', component: SignupPage },
  { path: 'authenticated', component: AuthenticatedUserComponent, canActivate: [AuthGuard],
    children: [
      { path: '', canActivateChild: [AuthGuard],
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        //   { path: 'dashboard', component: DashboardComponent },
        //   { path: 'country-list/:count', component: CountryListComponent },
        //   { path: 'country-detail/:id/:operation', component: CountryDetailComponent },
        //   { path: 'country-maint', component: CountryMaintComponent },
          { path: 'settings', component: SettingsPage },
        ] }
    ] },
  { path: '', component: LoginPage },
  { path: '**', component: LoginPage }
];
