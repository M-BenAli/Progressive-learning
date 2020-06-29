import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {SessionService} from "./services/session/session.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  securedPaths: string[];

  constructor(private sessionService: SessionService) {
    let matchAnyNumber  = '([0-9]{0,})';
    this.securedPaths = [
      '/users/' + matchAnyNumber
    ]
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const routePath = request.url.split('api')[1];
    let token;
    for(let securedPath of this.securedPaths) {
      // console.log(securedPath);
      if(routePath.match(securedPath)) {
        token = this.sessionService.getAuthenticationToken();
        console.log('Matched url with secured route path!');
      }
    }

    if(token) {
      const authReq = request.clone({setHeaders: {
        'Authorization': token
        }});
      return next.handle(authReq)
    } else
      return next.handle(request);
  }
}
