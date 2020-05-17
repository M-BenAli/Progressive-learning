import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public isAuthenticated: boolean;
  private userLogin: Object;
  private mockAccounts: Object[];

  constructor(private router: Router) {
    this.mockAccounts = [{username: "mohamed", password: "mohamed1234"},
      {username: "test", password: "testing1234" }];
    this.isAuthenticated = false;

  }

  login(username: string, password: string){
    let userLogin = {username: username, password: password}
    console.log(userLogin, this.mockAccounts[0]);
    if(this.mockAccounts.find(account => account['username'] == userLogin.username &&
      account['password'] == userLogin.password)){
      this.isAuthenticated = true;
      this.router.navigate(['homepage']);
    } else this.isAuthenticated = false;
  }

}
