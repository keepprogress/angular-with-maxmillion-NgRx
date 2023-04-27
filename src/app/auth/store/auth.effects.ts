import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthResponseData } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';


export class AuthEffects {
  authLogin = createEffect(this.authLogin.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
        return this.http
          .post<AuthResponseData>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + environment.firebaseAPIKey,
            {
              email: authData.payload.email,
              password: authData.payload.password,
              returnSecureToken: true
            }
            ).pipe(catchError(error =>{
              // ..
            of();
          }), map(resData => {
            of();
          }));
    })
  ));
  constructor(
    private actions: Actions,
    private http: HttpClient,
    ) {}
}
