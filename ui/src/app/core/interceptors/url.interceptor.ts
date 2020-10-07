import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

export class URLInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.includes(environment.baseUrl)) {
      const replacedUrl = request.url.replace(environment.baseUrl, environment.apiUrl);
      request = request.clone({ url: replacedUrl })
    }

    return next.handle(request);
  }
}
