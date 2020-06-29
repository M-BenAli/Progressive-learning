import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  get(userID: number) {
    return this.httpClient.get(environment.apiUrl + `/api/users/${userID}`);
  }

  getAll() {
    return this.httpClient.get(environment.apiUrl + `/api/users`);
  }

  update(userID: number, user: User) {
    return this.httpClient.put(environment.apiUrl + `/api/users/${userID}`, user);
  }

}
