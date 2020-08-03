import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LearningGoal} from "../../models/learning-goal";
import {LearningGoalService} from "../../services/learning-goal.service";
import {state, style, trigger} from "@angular/animations";

@Component({
  selector: 'app-unit-list',
  animations: [
    trigger('unitCompletion', [
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
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.css']
})
export class UnitListComponent implements OnInit {

  @Input() learningGoal: LearningGoal;
  @Output() updatedLearningGoal: EventEmitter<LearningGoal>;
  unitsBaseURL: string;

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
    this.unitsBaseURL = `/learning-goals/${this.learningGoal.id}/units/`
  }

}
