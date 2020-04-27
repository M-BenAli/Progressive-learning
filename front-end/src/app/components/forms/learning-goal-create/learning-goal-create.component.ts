import { Component, OnInit } from '@angular/core';
import {LearningGoal} from "../../../models/learning-goal";
import {LearningGoalService} from "../../../services/learning-goal.service";
import {Task} from "../../../models/task";
import {Router} from "@angular/router";

@Component({
  selector: 'app-learning-goal-create',
  templateUrl: './learning-goal-create.component.html',
  styleUrls: ['./learning-goal-create.component.css']
})
export class LearningGoalCreateComponent implements OnInit {

  private taskInputs: Task[];
  private learningGoalInput: string;
  private descriptionInput: string;

  private learningGoal: LearningGoal;

  constructor(private learningGoalService: LearningGoalService,
              private router: Router) {
    this.taskInputs = [new Task('')]
    this.learningGoalInput = ''
    this.descriptionInput = ''
  }

  private addTaskInput(){
    console.log("Adding a task")
    this.taskInputs.push(new Task(''))
  }

  private createLearningGoal() {
    this.learningGoal = new LearningGoal(Math.floor(Math.random() * 9999), this.learningGoalInput, this.taskInputs, 0,
      this.descriptionInput)
    this.learningGoalService.create(this.learningGoal).closed;
  }

  trackByIdx(index: number, obj: any){
    return index;
  }

  ngOnInit() {
  }

}
