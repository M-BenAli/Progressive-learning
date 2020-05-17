import { Injectable } from '@angular/core';
import {LearningGoal} from "../models/learning-goal";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LearningGoalService {

  private devRootUrl = "http://localhost:5000"

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  public get(id: number) {
    return this.httpClient.get(this.devRootUrl + `/api/learning-goals/${id}`)
  }

  public getAll() {
   return this.httpClient.get(this.devRootUrl + '/api/learning-goals')
  }

  public create(learningGoal: LearningGoal) {
    return this.httpClient.post(this.devRootUrl + '/api/learning-goals', learningGoal);
  }

  public update(id: number, learningGoal: LearningGoal) {
    return this.httpClient.put(this.devRootUrl + `/api/learning-goals/${id}`, learningGoal)
  }

  public delete(learningGoal: LearningGoal) {
    return this.httpClient.delete(this.devRootUrl + `/api/learning-goals/${learningGoal.id}`);

  }
}
