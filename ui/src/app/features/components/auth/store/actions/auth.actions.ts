import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  RequestLogin = '[Login Component] Request Login',
  LoginSuccessful = '[Login API] Login Successful',
  ErrorRequestLogin = '[Login API] Error Request Login',

  RequestSignup = '[Signup Component] Request Signup',
  ErrorRequestSignup = '[Signup API] Error Request Signup',

  RequestLogout = '[Navbar Component] Request Logout'
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

export class RequestSignup implements Action {
  readonly type = AuthActionTypes.RequestSignup;

  constructor(public payload: { signupData: any }) { }
}

export class ErrorRequestSignup implements Action {
  readonly type = AuthActionTypes.ErrorRequestSignup;

  constructor(public payload: { error: any }) { }
}

export class RequestLogout implements Action {
  readonly type = AuthActionTypes.RequestLogout;
}

export type LoginActions =
  RequestLogin
  | LoginSuccessful
  | ErrorRequestLogin
  | RequestSignup
  | ErrorRequestSignup
  | RequestLogout