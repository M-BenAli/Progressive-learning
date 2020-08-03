import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LearningGoal} from "../../models/learning-goal";
import {LearningGoalService} from "../../services/learning-goal.service";
import {LearningGoalEditComponent} from "../learning-goal-edit/learning-goal-edit.component";
import {Unit} from "../../models/unit";
import {UnitService} from "../../services/unit.service";
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
  deletedUnitsReg: Unit[];

  @ViewChild(LearningGoalEditComponent) learningEdit: LearningGoalEditComponent
  @Output() editing: EventEmitter<boolean>;
  @Output() deleted: EventEmitter<boolean>;
  @Output() cancel: EventEmitter<boolean>;
  @Output() saved: EventEmitter<LearningGoal>;
  @Input() set selectedLGoal(learningGoal: LearningGoal) {
    this.learningGoal = learningGoal;
  }

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
              private learningGoalService: LearningGoalService,
              private unitService: UnitService,
              public sessionService: SessionService,
              public permissionService: PermissionService) {
    this.renderEdit = false
    this.editing = new EventEmitter<boolean>()
    this.deleted = new EventEmitter<boolean>()
    this.cancel = new EventEmitter<boolean>()
    this.saved = new EventEmitter<LearningGoal>()
    this.deletedUnitsReg = []
  }

  onEdit() {
    this.renderEdit = true
    this.editing.emit(true);
    this.router.navigate(['edit'], {
      relativeTo: this.activatedRoute,
      queryParams: {id: this.learningGoal.id}
    })
  }

 async onSave() {
    this.renderEdit = false
    this.learningGoal = this.learningEdit.editingLearningGoal
    await this.clearUnitsReg();
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
          this.router.navigate(['./'], {
            relativeTo: this.activatedRoute,
            queryParams: {id: this.learningGoal.id}
          })
        });
  }

  onDelete() {
    console.log("Deleting Learning goal..")
    this.learningGoalService.delete(this.learningGoal).subscribe(
      () => {
        // console.log(learningGoal);
      }, error => {
        console.log(error)
      },
      () => {
        this.learningGoal = null;
        this.deleted.emit(true);
      });
  }

  onCancel() {
    this.learningGoal = null;
    this.renderEdit = false;
    this.cancel.emit(true);
  }

  registerDeletedUnit(unit) {
    this.deletedUnitsReg.push(unit)
  }

  async clearUnitsReg() {
    for (let unit of this.deletedUnitsReg) {
      console.log(unit);
      this.learningGoal.deleteUnit(unit);
      if (unit.id) {
        await this.unitService.delete(unit).toPromise();
      }
    }
    this.deletedUnitsReg = []
  }

  onUpdatedLearningGoal(learningGoal: LearningGoal) {
    this.learningGoal = learningGoal;
    console.log(this.learningGoal);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}



/*  reloadTaskProgress() {
    this.learningGoal.calculateProgress()
    this.learningGoalService.update(this.learningGoal.id, this.learningGoal)
      .subscribe((learningGoal: LearningGoal) => {
        this.learningGoal = LearningGoal.fromJSON(learningGoal)
      }, error => {
        console.log(error)
      }, () => {
        this.selectedLearningGoal = this.learningGoal
        // this.updatedLearningGoal.emit(this.learningGoal)
        // console.log(this.learningGoal);
      });
  }*/
