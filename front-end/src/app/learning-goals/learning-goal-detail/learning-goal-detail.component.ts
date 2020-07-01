import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LearningGoal} from "../../models/learning-goal";
import {LearningGoalService} from "../../services/learning-goal.service";
import {LearningGoalEditComponent} from "../learning-goal-edit/learning-goal-edit.component";
import {Subscription} from "rxjs";
import {Task} from "../../models/task";
import {TaskService} from "../../services/task.service";
import {PermissionService} from "../../services/permissions/permission.service";
import {SessionService} from "../../services/session/session.service";

@Component({
  selector: 'app-learning-goal-detail',
  templateUrl: './learning-goal-detail.component.html',
  styleUrls: ['./learning-goal-detail.component.css']
})
export class LearningGoalDetailComponent implements OnInit {

  learningGoal: LearningGoal;
  renderEdit: boolean;
  queryParamSubscription: Subscription;
  deletedTasksReg: Task[];

  @ViewChild(LearningGoalEditComponent) learningEdit: LearningGoalEditComponent
  @Input() selectedLearningGoal: LearningGoal;
  @Output() editing: EventEmitter<boolean>;
  @Output() deleted: EventEmitter<boolean>;
  @Output() cancel: EventEmitter<boolean>;
  @Output() saved: EventEmitter<LearningGoal>;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
              private learningGoalService: LearningGoalService,
              private taskService: TaskService,
              public sessionService: SessionService,
              public permissionService: PermissionService) {
    this.renderEdit = false
    this.editing = new EventEmitter<boolean>()
    this.deleted = new EventEmitter<boolean>()
    this.cancel = new EventEmitter<boolean>()
    this.saved = new EventEmitter<LearningGoal>()
    this.deletedTasksReg = []
  }

  edit() {
    this.renderEdit = true
    this.editing.emit(true);
    this.router.navigate(['edit'], {
      relativeTo: this.activatedRoute,
      queryParams: {id: this.selectedLearningGoal.id}
    })
  }

 async save() {
    this.renderEdit = false
    this.learningGoal = this.learningEdit.editingLearningGoal
    await this.clearTasksReg();
    this.learningGoal.calculateProgress();
    console.log(this.learningGoal);
    this.learningGoalService.update(this.learningGoal.id, this.learningGoal)
      .subscribe((learningGoal: LearningGoal) => {
          this.learningGoal = LearningGoal.fromJSON(learningGoal)
        },
        error => {
          console.log(error)
        },
        () => {
          this.learningGoal.calculateProgress()
          this.saved.emit(this.learningGoal)
          console.log(this.learningGoal)
          this.router.navigate([''], {
            relativeTo: this.activatedRoute,
            queryParams: {id: this.learningGoal.id}
          })
        });
  }

  delete() {
    console.log("Deleting Learning goal..")
    this.learningGoalService.delete(this.selectedLearningGoal).subscribe(
      () => {
        // console.log(learningGoal);
      }, error => {
        console.log(error)
      },
      () => {
        this.selectedLearningGoal = null;
        this.deleted.emit(true);
      });
  }

  onCancel() {
    this.selectedLearningGoal = null;
    this.renderEdit = false;
    this.cancel.emit(true);
  }

  reloadTaskProgress() {
    this.learningGoal.calculateProgress()
    this.learningGoalService.update(this.learningGoal.id, this.learningGoal)
      .subscribe((learningGoal: LearningGoal) => {
        this.learningGoal = LearningGoal.fromJSON(learningGoal)
      }, error => {
        console.log(error)
      }, () => {
        this.selectedLearningGoal = this.learningGoal
      });
  }

  registerDeletedTask(task) {
    this.deletedTasksReg.push(task)
  }

  async clearTasksReg() {
    for (let task of this.deletedTasksReg) {
      console.log(task);
      this.learningGoal.deleteTask(task);
      if (task.id) {
        await this.taskService.delete(task).toPromise();
      }
    }
    this.deletedTasksReg = []
  }

  ngOnInit() {
    this.queryParamSubscription = this.activatedRoute.queryParams.subscribe(
      params => {
        if (params.id) {
          this.renderEdit = false
          this.learningGoalService.get(params.id).subscribe(
            (learningGoal: LearningGoal) => {
              this.selectedLearningGoal = learningGoal
            },
            (err) => {
              console.log(err)
            }, () => {
              this.learningGoal = LearningGoal.fromJSON(this.selectedLearningGoal)
              console.log(this.learningGoal)
            })
        }
      })
  }

  ngOnDestroy() {
    this.queryParamSubscription.unsubscribe()
    this.learningGoal = null
  }

}
