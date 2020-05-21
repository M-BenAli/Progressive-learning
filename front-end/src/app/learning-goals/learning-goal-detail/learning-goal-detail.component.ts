import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from "@angular/router";
import {LearningGoal} from "../../models/learning-goal";
import {LearningGoalService} from "../../services/learning-goal.service";
import {LearningGoalEditComponent} from "../../components/forms/learning-goal-edit/learning-goal-edit.component";
import {Subscription} from "rxjs";
import {error} from "util";

@Component({
  selector: 'app-learning-goal-detail',
  templateUrl: './learning-goal-detail.component.html',
  styleUrls: ['./learning-goal-detail.component.css']
})
export class LearningGoalDetailComponent implements OnInit {


  learningGoal: LearningGoal;
  renderEdit: boolean;

  @ViewChild(LearningGoalEditComponent) learningEdit: LearningGoalEditComponent
  @Input() selectedLearningGoal: LearningGoal;
  @Output() editing: EventEmitter<boolean>;
  @Output() deleted: EventEmitter<boolean>;
  @Output() saved: EventEmitter<LearningGoal>;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
              private learningGoalService: LearningGoalService) {
    this.renderEdit = false
    this.editing = new EventEmitter<boolean>()
    this.deleted = new EventEmitter<boolean>()
    this.saved = new EventEmitter<LearningGoal>()
  }

  onEdit() {
    this.renderEdit = true
    this.editing.emit(true);
    this.router.navigate(['edit'], {
      relativeTo: this.activatedRoute,
      queryParams: {id: this.selectedLearningGoal.id}
    })
  }

  onSave() {
    this.learningGoal = this.learningEdit.editingLearningGoal
    this.learningGoalService.update(this.learningGoal.id, this.learningGoal)
      .subscribe((learningGoal: LearningGoal) => {
          this.learningGoal = LearningGoal.fromJSON(learningGoal)
        },
        error => {
          console.log(error)
        },
        () => {
          console.log(this.learningGoal)
          this.renderEdit = false
          this.saved.emit(this.learningGoal)
          this.router.navigate([''], {
            relativeTo: this.activatedRoute,
            queryParams: {id: this.learningGoal.id}
          })
        });
  }

  onDelete() {
    this.learningGoalService.delete(this.selectedLearningGoal).subscribe(
      (learningGoal: LearningGoal) => {
      }, error => {
        console.log(error)
      },
      () => {
        console.log("Learning goal deleted")
        this.selectedLearningGoal = null;
        this.deleted.emit(true);
      });
  }

  reloadTaskProgress() {
    let completedTasks: number = 0
    let tasks = this.learningGoal.tasks
    tasks.forEach(task => {
      console.log(task)
      if (task.completed) {
        completedTasks++
      }
    })

    this.learningGoal.progress = (100 / tasks.length) * completedTasks
    this.learningGoalService.update(this.learningGoal.id, this.learningGoal)
      .subscribe((learningGoal: LearningGoal) => {
        console.log(learningGoal)
        this.learningGoal = LearningGoal.fromJSON(learningGoal)
      }, error => {
        console.log(error)
      }, () => {
        this.selectedLearningGoal = this.learningGoal
      });
  }

  ngOnInit() {
    this.learningGoal = LearningGoal.deepCopy(this.selectedLearningGoal)
    this.reloadTaskProgress();
  }

  ngOnDestroy() {
  }

}
