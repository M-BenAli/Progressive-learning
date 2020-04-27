import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {LearningGoalService} from "../../services/learning-goal.service";
import {LearningGoal} from "../../models/learning-goal";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-learning-goal',
  templateUrl: './learning-goals-list.component.html',
  styleUrls: ['./learning-goals-list.component.css']
})
export class LearningGoalsListComponent implements OnInit {

  // private learningGoals: LearningGoal[];
  private selectedLearningGoal: LearningGoal;
  private creatingLearningGoal: boolean;

  private isEditing: boolean;

  constructor(private learningGoalService: LearningGoalService,
              private activatedRoute: ActivatedRoute, private router: Router) {
    // this.learningGoals = [];
    this.selectedLearningGoal = null;
    this.creatingLearningGoal = false;
  }

  private onSelection(learningGoal: LearningGoal){
    if(this.isEditing) return false
    this.selectedLearningGoal = learningGoal
    this.creatingLearningGoal = false

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {id:  this.selectedLearningGoal.id}
    })
  }

  private createLearningGoal(){
    this.selectedLearningGoal = null;
    this.creatingLearningGoal = true;
    this.router.navigate(['create'], {
      relativeTo: this.activatedRoute
    })
  }

  ngOnInit() {
    this.learningGoalService.getAll();
  }

}
