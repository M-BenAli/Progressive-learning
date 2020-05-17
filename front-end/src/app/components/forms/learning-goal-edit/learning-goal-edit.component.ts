import { Component, OnInit } from '@angular/core';
import {LearningGoal} from "../../../models/learning-goal";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {LearningGoalService} from "../../../services/learning-goal.service";
import {Task} from "../../../models/task";

@Component({
  selector: 'app-learning-goal-edit',
  templateUrl: './learning-goal-edit.component.html',
  styleUrls: ['./learning-goal-edit.component.css']
})
export class LearningGoalEditComponent implements OnInit {

  public editingLearningGoal: LearningGoal;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private learningGoalService: LearningGoalService) {

  }

  private addTaskInput() {
    this.editingLearningGoal.tasks.push(new Task(''))

  }

  trackByIdx(index: number, obj: any){
    return index;
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      let learningGoal = this.learningGoalService.get(params['id'])
      this.editingLearningGoal = LearningGoal.deepCopy(learningGoal)
    })
  }

}
