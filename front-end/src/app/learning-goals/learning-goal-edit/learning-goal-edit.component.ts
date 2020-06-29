import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LearningGoal} from "../../models/learning-goal";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {LearningGoalService} from "../../services/learning-goal.service";
import {TaskService} from "../../services/task.service";
import {Task} from "../../models/task";
import {Form, FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-learning-goal-edit',
  templateUrl: './learning-goal-edit.component.html',
  styleUrls: ['./learning-goal-edit.component.css']
})
export class LearningGoalEditComponent implements OnInit {

  @Input() editingLearningGoal: LearningGoal;
  @Output() deletedTasksReg: EventEmitter<Task>;
  editingForm;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private learningGoalService: LearningGoalService,
              private taskService: TaskService,
              private formBuilder: FormBuilder) {
    this.deletedTasksReg = new EventEmitter<Task>()

  }

  get tasks() {
    return this.editingForm.get('tasks') as FormArray
  }

  addTask() {
    this.editingLearningGoal.addTask(new Task('', false))
  }

  deleteTask(task: Task, index: number) {
    this.deletedTasksReg.emit(task)
    this.editingLearningGoal.deleteTask(task, index)
  }

  renderFormTasks(tasks: Task[]) {
    let formGroupArray: FormGroup[] = []
    tasks.forEach(task => {
      formGroupArray.push(new FormGroup({
        name: new FormControl(task.name),
        completed: new FormControl(task.completed),
        id: new FormControl(task.id)
      }))
    })
    return formGroupArray
  }


  ngOnInit() {
    this.editingForm = this.formBuilder.group({
      goal: this.editingLearningGoal.goal,
      description: this.editingLearningGoal.description,
      tasks: this.formBuilder.array(
        [this.renderFormTasks(this.editingLearningGoal.tasks)]
      )
    })

  }

}
