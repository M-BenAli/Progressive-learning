import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LearningGoal} from "../../models/learning-goal";
import {ActivatedRoute, Router} from "@angular/router";
import {LearningGoalService} from "../../services/learning-goal.service";
import {UnitService} from "../../services/unit.service";
import {Unit} from "../../models/unit";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-learning-goal-edit',
  templateUrl: './learning-goal-edit.component.html',
  styleUrls: ['./learning-goal-edit.component.css']
})
export class LearningGoalEditComponent implements OnInit {

  @Input() editingLearningGoal: LearningGoal;
  @Output() deletedTasksReg: EventEmitter<Unit>;
  editingForm;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private learningGoalService: LearningGoalService,
              private taskService: UnitService,
              private formBuilder: FormBuilder) {
    this.deletedTasksReg = new EventEmitter<Unit>()

  }

  get units() {
    return this.editingForm.get('units') as FormArray
  }

  addUnit() {
    this.editingLearningGoal.addUnit(new Unit('', false))
  }

  deleteTask(task: Unit, index: number) {
    this.deletedTasksReg.emit(task)
    this.editingLearningGoal.deleteTask(task, index)
  }

  renderFormUnits(units: Unit[]) {
    let formGroupArray: FormGroup[] = []
    units.forEach(unit => {
      formGroupArray.push(new FormGroup({
        name: new FormControl(unit.name),
        completed: new FormControl(unit.completed),
        id: new FormControl(unit.id)
      }))
    })
    return formGroupArray
  }


  ngOnInit() {
    this.editingForm = this.formBuilder.group({
      goal: this.editingLearningGoal.goal,
      description: this.editingLearningGoal.description,
      units: this.formBuilder.array(
        [this.renderFormUnits(this.editingLearningGoal.units)]
      )
    })
  }

}
