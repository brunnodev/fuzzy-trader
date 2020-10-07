import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  RequestLogin = '[Login Component] Request Login',
  LoginSuccessful = '[Login API] Login Successful',
  ErrorRequestLogin = '[Login API] Error Request Login'
}

export class RequestLogin implements Action {
  readonly type = AuthActionTypes.RequestLogin;

  constructor(public payload: { email: string, password: string }) { }
}

export class LoginSuccessful implements Action {
  readonly type = AuthActionTypes.LoginSuccessful;

  constructor(public payload: { sessionData: any }) { }
}

export class ErrorRequestLogin implements Action {
  readonly type = AuthActionTypes.ErrorRequestLogin;

  constructor(public payload: { error: any }) { }
}

export type LoginActions =
  RequestLogin
  | LoginSuccessful
  | ErrorRequestLogin