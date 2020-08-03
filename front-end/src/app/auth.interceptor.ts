import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SessionService} from "./services/session/session.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  readonly SECURED_PATHS: string[];

  constructor(private sessionService: SessionService) {
    // let matchAnyNumber  = '([0-9]{0,})';
    //Todo add regexp to securedPaths
    this.SECURED_PATHS = [
      'users/',
      'subjects/',
      'units/'
    ]
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const routePath = request.url.split('/api/')[1];
    let token;
    for(let securedPath of this.SECURED_PATHS) {
      // console.log(securedPath, routePath);
      if(routePath.match(securedPath)) {
        token = this.sessionService.getAuthenticationToken();
        // console.log('Matched url with secured route path!');
      }
      // console.log('No url matched with secured route path');
    }

    if(token) {
      const authReq = request.clone({setHeaders: {
        'Authorization': token
        }});
      return next.handle(authReq)
    } else
      // console.log('No authentication token found', request);
    return next.handle(request);
  }
}
