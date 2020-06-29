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
  public isAuthenticated: boolean;
  public token;

  constructor(private router: Router,
              private httpClient: HttpClient) {
    this.isAuthenticated = false;
  }

  authenticate(credentials) {
    // console.log(credentials);
    return this.httpClient.post(environment.apiUrl + '/api/authentication/login',
      credentials, { observe: 'response' });
  }

  getAuthenticationToken() {
    return this.token;
  }

  setToken(token): void{
    this.token = token;
    this.isAuthenticated = token ? true : false;
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
    this.isAuthenticated = true;
  }

  public getCurrentUser() {
    return this.currentUser;
  }

  logOut(){
    this.currentUser = null;
    this.isAuthenticated = false;
    this.token = null;
  }

}
