import {Injectable} from '@angular/core';
import {LearningGoal} from "../models/learning-goal";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LearningGoalService {

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  public get(id: number) {
    return this.httpClient.get(environment.apiUrl + `/api/learning-goals/${id}`);
  }

  public getAll() {
    return this.httpClient.get(environment.apiUrl + `/api/learning-goals`);
  }

  public getUserLearningGoals(userID: number){
    return this.httpClient.get(environment.apiUrl + `/api/users/${userID}/learning-goals`);
  }

  public create(learningGoal: LearningGoal) {
    return this.httpClient.post(environment.apiUrl + '/api/learning-goals', learningGoal);
  }

  public update(id: number, learningGoal: LearningGoal) {
    return this.httpClient.put(environment.apiUrl + `/api/learning-goals/${id}`, learningGoal)
  }

  public delete(learningGoal: LearningGoal) {
    return this.httpClient.delete(environment.apiUrl + `/api/learning-goals/${learningGoal.id}`);
  }

}
