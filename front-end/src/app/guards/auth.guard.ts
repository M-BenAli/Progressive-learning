import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {SessionService} from "../services/session/session.service";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private sessionService: SessionService,
              private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.sessionService.isAuthenticated()) {
      // console.log("Authenticated with current session");
      return true;
    } else {
      this.sessionService.getSessionToken().subscribe(resp => {
          const token = resp.headers.get('Authorization');
          if (token) {
            this.sessionService.setToken(token);
            this.sessionService.setCurrentUser(User.fromJSON(resp.body['user']));
          }
        }
        , (error) => {
          console.log(error);
        }, () => {
          if (this.sessionService.getAuthenticationToken()) {
            // console.log("Authenticated with token");
            // console.log(state, next);
            this.router.navigate([state.url])
            return true;
          } else {
            // console.log("Not authenticated");
            this.router.navigate(['login']);
            return false
          }
        });
    }
  }
}


