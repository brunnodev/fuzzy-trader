import { AuthActionTypes, LoginActions } from '../actions/auth.actions';

export interface AuthState {
  loading: boolean,
  loggedIn: boolean,
  token: any,
  user: any
}

export const initialAuthState: AuthState = {
  loading: false,
  loggedIn: false,
  token: undefined,
  user: undefined
}

export function reducer(state = initialAuthState, action: LoginActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.RequestLogin:
      return { ...state, loading: true }

    case AuthActionTypes.LoginSuccessful:
      return { ...state, loading: false }

    case AuthActionTypes.ErrorRequestLogin:
      return { ...state, loading: false }

    default:
      return state
  }
}
