import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SESSION_STORAGE_KEY } from '../session/session.config';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((response: HttpErrorResponse) => {
          const isInUrlWhiteList =
            response.url.includes('/login')

          if (!isInUrlWhiteList && this.isErrorOrForbiddenCode(response)) {
            localStorage.removeItem(SESSION_STORAGE_KEY)
            this.router.navigateByUrl('/auth/login')
          }

          return throwError(response)
        }))
  }

  private isErrorOrForbiddenCode(response) {
    return response.status === 401 || response.status === 403
  }
}