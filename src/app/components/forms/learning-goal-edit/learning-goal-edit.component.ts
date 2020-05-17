import {Component, Input, OnInit} from '@angular/core';
import {LearningGoal} from "../../../models/learning-goal";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {LearningGoalService} from "../../../services/learning-goal.service";
import {Task} from "../../../models/task";
import {error} from "util";

@Component({
  selector: 'app-learning-goal-edit',
  templateUrl: './learning-goal-edit.component.html',
  styleUrls: ['./learning-goal-edit.component.css']
})
export class LearningGoalEditComponent implements OnInit {

  @Input() editingLearningGoal: LearningGoal;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private learningGoalService: LearningGoalService) {

  }

  private addTaskInput() {
    this.editingLearningGoal.addTask(new Task(''))
  }

  trackByIdx(index: number, obj: any){
    return index;
  }

  ngOnInit() {
  console.log(this.editingLearningGoal)
  }

}
