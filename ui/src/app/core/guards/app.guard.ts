import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { RequestLogout } from 'app/features/components/auth/store/actions/auth.actions';
import { AuthState } from 'app/features/components/auth/store/reducers/auth.reducer';
import { Observable, of } from 'rxjs';

import { SESSION_STORAGE_KEY } from '../session/session.config';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<AuthState>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const session = localStorage.getItem(SESSION_STORAGE_KEY)

    if (!!session) {
      return of(true)
    } else {
      this.dispatchLogoutIfNotLogged(false)
    }
  }

  private dispatchLogoutIfNotLogged(isLogged) {
    if (!isLogged) {
      this.store.dispatch(new RequestLogout())
    }
  }
}