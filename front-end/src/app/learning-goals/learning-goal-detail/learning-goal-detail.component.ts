import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from "@angular/router";
import {LearningGoal} from "../../models/learning-goal";
import {LearningGoalService} from "../../services/learning-goal.service";
import {LearningGoalEditComponent} from "../learning-goal-edit/learning-goal-edit.component";
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
  queryParamSubscription: Subscription;

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

  edit() {
    this.renderEdit = true
    this.editing.emit(true);
    this.router.navigate(['edit'], {
      relativeTo: this.activatedRoute,
      queryParams: {id: this.selectedLearningGoal.id}
    })
  }

  save() {
    this.learningGoal = this.learningEdit.editingLearningGoal
    console.log(this.learningGoal, this.learningEdit.editingLearningGoal)
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
          this.learningGoal.calculateProgress()
          this.router.navigate([''], {
            relativeTo: this.activatedRoute,
            queryParams: {id: this.learningGoal.id}
          })
        });
  }

  delete() {
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
