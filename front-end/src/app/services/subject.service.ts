import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {Subject} from "../models/subject";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {


  constructor(private httpClient: HttpClient, private router: Router) {
  }

  public get(id: number) {
    return this.httpClient.get(environment.apiUrl + `/subjects/${id}`);
  }

  public getUserSubjects(userID: number){
    return this.httpClient.get(environment.apiUrl + `/users/${userID}/subjects`);
  }

  public create(subject: Subject) {
    return this.httpClient.post(environment.apiUrl + '/subjects', subject);
  }

  public update(id: number, subject: Subject) {
    return this.httpClient.put(environment.apiUrl + `/subjects/${id}`, subject)
  }

  public delete(subject: Subject) {
    return this.httpClient.delete(environment.apiUrl + `/subjects/${subject.id}`);
  }
}
