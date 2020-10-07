import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionService } from '../session/services/session.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private sessionService: SessionService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isInWhiteList(request.url)) {
      return next.handle(request)
    }

    const sessionData = this.sessionService.loadSession()

    if (sessionData) {
      request = this.mapAuthorizationHeader(request, sessionData.token);
    }

    return next.handle(request)
  }

  private isInWhiteList(url: string): boolean {
    return url.includes('/signup')
      || url.includes('/login')
  }

  private mapAuthorizationHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        authorization: token
      }
    })
  }
}