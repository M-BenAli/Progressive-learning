import { Injectable } from '@angular/core';
import {LearningGoal} from "../models/learning-goal";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LearningGoalService {

  private devRootUrl = "http://localhost:5000"
  public learningGoals: LearningGoal[];

  constructor(private httpClient: HttpClient, private router: Router) {
    this.learningGoals = []

  }

  public get(id: number) {
    let learningGoal = this.learningGoals.find(lg => lg.id == id)
    return learningGoal
  }

  public getAll() {
   this.httpClient.get(this.devRootUrl + '/api/learning-goals')
      .subscribe((learningGoals: []) => {
        return this.learningGoals = learningGoals
      }, error => {
        console.log(error)
      }, () => {
        // console.log("Finished getting all learning-goals")
      });
    // console.log(this.learningGoals)
    return this.learningGoals

  }

  public create(learningGoal: LearningGoal) {
   return this.httpClient.post(this.devRootUrl + '/api/learning-goals', learningGoal)
      .subscribe((learningGoals: LearningGoal[]) =>
        {this.learningGoals = learningGoals},
        error => { console.log(error)},
        () => {}
        );
  }

  public update(id: number, learningGoal: LearningGoal) {
    let index: number = this.learningGoals.indexOf(learningGoal)
    /*this.learningGoals[index] = learningGoal
    console.log(this.learningGoals[index], index)*/

    this.httpClient.put(this.devRootUrl + `/api/learning-goals/${id}`, learningGoal)
      .subscribe((responseLearningGoal: LearningGoal) =>
          this.learningGoals[index] = responseLearningGoal,
        error => console.log(error),
        () => console.log("Finished updating learning goal"));

  }

  public delete(learningGoal: LearningGoal) {
    this.learningGoals = this.learningGoals.filter(lg => lg.id != learningGoal.id);
    this.httpClient.delete(this.devRootUrl + `/api/learning-goals/${learningGoal.id}`)
      .subscribe((next: LearningGoal[]) => console.log(next),
        error => console.log(error),
        () => console.log(`Deleted learning goal with id: ${learningGoal.id}`))
  }
}
