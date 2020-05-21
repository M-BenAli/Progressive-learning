import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {LearningGoalService} from "../../services/learning-goal.service";
import {LearningGoal} from "../../models/learning-goal";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {LearningGoalDetailComponent} from "../learning-goal-detail/learning-goal-detail.component";

@Component({
  selector: 'app-learning-goal',
  templateUrl: './learning-goals-list.component.html',
  styleUrls: ['./learning-goals-list.component.css']
})
export class LearningGoalsListComponent implements OnInit {

  public learningGoals: LearningGoal[];
  public selectedLearningGoal: LearningGoal;
  public renderingCreate: boolean;

  public isEditing: boolean;

  constructor(private learningGoalService: LearningGoalService,
              private activatedRoute: ActivatedRoute, private router: Router) {
    this.learningGoals = [];
    this.selectedLearningGoal = null;
    this.renderingCreate = false;
  }

  renderLearningGoal(learningGoal: LearningGoal) {
    this.selectedLearningGoal = learningGoal
    console.log(learningGoal)
    this.renderingCreate = false
    this.router.navigate([''], {
      relativeTo: this.activatedRoute,
      queryParams: {id: this.selectedLearningGoal.id}
    })
  }

  renderCreate() {
    this.selectedLearningGoal = null;
    this.renderingCreate = true;
    this.router.navigate(['create'], {
      relativeTo: this.activatedRoute
    })
  }

  onCloseReq(event) {
    console.log("Closing child components..")
    // this.learningGoals = this.learningGoalService.getAll()
    this.renderingCreate = false;
    this.selectedLearningGoal = null;
  }

  onCreate(learningGoal: LearningGoal) {
    console.log("Created new learning goal: ", learningGoal)
    this.learningGoals.push(learningGoal)
    this.renderingCreate = false;
    this.selectedLearningGoal = learningGoal
    console.log(this.learningGoals)
  }

  onEdit(editing: boolean) {
    this.isEditing = editing;
  }

  onSave(updatedLearningGoal: LearningGoal) {
    // this.selectedLearningGoal = updatedLearningGoal;
    let index = this.learningGoals.indexOf(this.selectedLearningGoal);
    this.learningGoals[index] = updatedLearningGoal;
  }

  onDelete() {
    this.learningGoals = this.learningGoals.filter(lg => lg.id != this.selectedLearningGoal.id)
    this.selectedLearningGoal = null
    this.router.navigate(['']);
  }

  ngOnInit() {
    this.learningGoalService.getAll().subscribe((learningGoals: LearningGoal[]) => {
        this.learningGoals = learningGoals.map(lg => LearningGoal.fromJSON(lg))
      }, error => {
        console.log(error)
      }, () => console.log(this.learningGoals)
    );
  }

}
