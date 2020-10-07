import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { SESSION_STORAGE_KEY } from 'app/core/session/session.config';
import { SweetAlertService } from 'app/shared/services/sweet-alert.service';
import { defer, of } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import {
  AuthActionTypes,
  ErrorRequestLogin,
  ErrorRequestSignup,
  LoginSuccessful,
  RequestLogin,
  RequestSignup,
  RequestLogout,
} from '../actions/auth.actions';

@Injectable()
export class AuthEffects {

  @Effect()
  requestLogin$ = this.actions$.pipe(
    ofType<RequestLogin>(AuthActionTypes.RequestLogin),
    map(action => action.payload),
    switchMap(loginData =>
      this.authService.login(loginData)
        .pipe(
          map(sessionData => new LoginSuccessful({ sessionData })),
          catchError(error => of(new ErrorRequestLogin({ error })))
        )
    ))

  @Effect({ dispatch: false })
  loginSuccessful$ = this.actions$.pipe(
    ofType<LoginSuccessful>(AuthActionTypes.LoginSuccessful),
    map(action => action.payload.sessionData),
    tap(this.setLocalStorageSession),
    tap(this.redirectToAssets.bind(this))
  )

  private setLocalStorageSession(sessionData) {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ ...sessionData }))
  }

  private redirectToAssets() {
    this.router.navigate(['/investments'])
  }

  @Effect({ dispatch: false })
  errorRequestLogin$ = this.actions$.pipe(
    ofType<ErrorRequestLogin>(AuthActionTypes.ErrorRequestLogin),
    map(action => action.payload.error.error), //improve it in the api
    tap(error => this.sweetAlertService.errorSwal(error.message))
  )

  @Effect()
  requestSignup$ = this.actions$.pipe(
    ofType<RequestSignup>(AuthActionTypes.RequestSignup),
    map(action => action.payload.signupData),
    switchMap(signupData =>
      this.authService.signup(signupData)
        .pipe(
          map(sessionData => new LoginSuccessful({ sessionData })),
          catchError(error => of(new ErrorRequestSignup({ error })))
        )
    ))

  @Effect({ dispatch: false })
  errorRequestSignup$ = this.actions$.pipe(
    ofType<ErrorRequestSignup>(AuthActionTypes.ErrorRequestSignup),
    map(action => action.payload.error.error), //improve it in the api
    tap(error => this.sweetAlertService.errorSwal(error.message))
  )

  @Effect({ dispatch: false })
  requestLogout$ = this.actions$.pipe(
    ofType<RequestLogout>(AuthActionTypes.RequestLogout),
    tap(() => localStorage.removeItem(SESSION_STORAGE_KEY)),
    tap(() => this.redirectToLogin())
  )

  private redirectToLogin() {
    this.router.navigate(['/auth/login'])
  }

  @Effect()
  init$ = defer((): any => {
    const sessionData = this.retriveSession()

    if (sessionData) {
      return of(new LoginSuccessful({ sessionData }))
    } else {
      localStorage.removeItem(SESSION_STORAGE_KEY)
      return of(new ErrorRequestLogin(null))
    }
  })

  private retriveSession() {
    const sessionRaw = localStorage.getItem(SESSION_STORAGE_KEY)
    return JSON.parse(sessionRaw)
  }

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private sweetAlertService: SweetAlertService
  ) { }
}
