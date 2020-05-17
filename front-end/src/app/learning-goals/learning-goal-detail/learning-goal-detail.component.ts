import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from "@angular/router";
import {LearningGoal} from "../../models/learning-goal";
import {LearningGoalService} from "../../services/learning-goal.service";
import {LearningGoalEditComponent} from "../../components/forms/learning-goal-edit/learning-goal-edit.component";

@Component({
  selector: 'app-learning-goal-detail',
  templateUrl: './learning-goal-detail.component.html',
  styleUrls: ['./learning-goal-detail.component.css']
})
export class LearningGoalDetailComponent implements OnInit {

  private selectedLearningGoal: LearningGoal;
  private isEditing: boolean;

  @ViewChild(LearningGoalEditComponent, {static: false}) learningEdit: LearningGoalEditComponent
  @Output() editing: EventEmitter<boolean>;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
              private learningGoalService: LearningGoalService) {
    this.selectedLearningGoal = null
    this.isEditing = false
    this.editing = new EventEmitter<boolean>()
  }

  onEdit() {
    this.isEditing = true
    this.editing.emit(true);
    this.router.navigate(['edit'], {
      relativeTo: this.activatedRoute,
      queryParams: {id: this.selectedLearningGoal.id}
    })
  }

  onSave() {
    this.selectedLearningGoal = this.learningEdit.editingLearningGoal
    this.learningGoalService.update(this.selectedLearningGoal.id, this.selectedLearningGoal)
    this.isEditing = false
    this.editing.emit(false)
    this.router.navigate(['detail'], {
      relativeTo: this.activatedRoute,
      queryParams: {id: this.selectedLearningGoal.id}
    })
    console.log(this.learningGoalService.getAll())

  }

  onDelete() {
    this.learningGoalService.delete(this.selectedLearningGoal);
    this.router.navigate(['./'])
  }

  onTaskUpdate() {
    // console.log("Task being changed", this.selectedLearningGoal.tasks)
    let completedTasks: number = 0
    let tasks = this.selectedLearningGoal.tasks
    for (let i = 0; i < tasks.length; i++) {
      if(tasks[i].completed){
        completedTasks++
      }
    }
    this.selectedLearningGoal.progress = (100 / tasks.length) * completedTasks
    this.learningGoalService.update(this.selectedLearningGoal.id, this.selectedLearningGoal)
    // console.log(completedTasks, tasks.length, this.selectedLearningGoal.progress)
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.selectedLearningGoal = this.learningGoalService.get(params.id);
      console.log(this.selectedLearningGoal)
    })
  }

}
