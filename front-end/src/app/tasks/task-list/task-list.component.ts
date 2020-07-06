import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LearningGoal} from "../../models/learning-goal";
import {LearningGoalService} from "../../services/learning-goal.service";
import {state, style, trigger} from "@angular/animations";

@Component({
  selector: 'app-task-list',
  animations: [
    trigger('taskCompletion', [
      state('incomplete', style({
        backgroundColor: 'orange'
      })),
      state('completed', style({
        backgroundColor: 'lightgreen'
      })),
      // transition('incomplete <=> completed', [
      //   // animate('5000ms ease-out')
      // ])
    ])
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {


  @Input() learningGoal: LearningGoal;
  @Output() updatedLearningGoal: EventEmitter<LearningGoal>;

  constructor(private learningGoalService: LearningGoalService) {
    this.updatedLearningGoal = new EventEmitter<LearningGoal>();
  }

  reloadTaskProgress() {
    this.learningGoal.calculateProgress();
    this.learningGoalService.update(this.learningGoal.id, this.learningGoal)
      .subscribe((learningGoal: LearningGoal) => {
        this.learningGoal = LearningGoal.fromJSON(learningGoal)
      }, error => {
        console.log(error)
      }, () => {
        // console.log(this.learningGoal);
        this.updatedLearningGoal.emit(this.learningGoal)
      });
  }

  ngOnInit(): void {
    // console.log(this.learningGoal);
  }

}
