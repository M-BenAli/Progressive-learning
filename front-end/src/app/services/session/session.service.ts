import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {User} from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public currentUser: User;
  public authenticated: boolean;
  public token;

  constructor(private router: Router,
              private httpClient: HttpClient) {
    this.authenticated = false;
  }

  authenticate(credentials) {
    // console.log(credentials);
    return this.httpClient.post(environment.apiUrl + '/authentication/login',
      credentials, { observe: 'response', withCredentials: true });
  }

  getSessionToken() {
    return this.httpClient.get(environment.apiUrl + '/authentication/session-token',
      { observe: 'response', withCredentials: true });
  }

  getAuthenticationToken() {
    return this.token;
  }

  setToken(token): void{
    this.token = token;
    this.authenticated = true;
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
    this.authenticated = true;
  }

  public getCurrentUser() {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.authenticated
  }

  logOut(){
    this.currentUser = null;
    this.authenticated = false;
    this.token = null;
    return this.httpClient.post(environment.apiUrl + `/authentication/logout`, {},
      { withCredentials: true });
  }

}
