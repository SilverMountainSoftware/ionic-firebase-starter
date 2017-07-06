import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
// Do not import from 'firebase' as you'd lose the tree shaking benefits
import * as firebase from 'firebase/app';

export abstract class UserApi {
    signIn: (from: string) => Observable<firebase.User>;
    signOut: () => Observable<any>;
    userName: () => string;
}
