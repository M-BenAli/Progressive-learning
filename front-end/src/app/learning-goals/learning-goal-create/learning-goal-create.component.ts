import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LearningGoal} from "../../models/learning-goal";
import {LearningGoalService} from "../../services/learning-goal.service";
import {Task} from "../../models/task";
import {Router} from "@angular/router";
import {FormBuilder, FormArray} from "@angular/forms";

@Component({
  selector: 'app-learning-goal-create',
  templateUrl: './learning-goal-create.component.html',
  styleUrls: ['./learning-goal-create.component.css']
})
export class LearningGoalCreateComponent implements OnInit {

  learningGoalForm;
  @Output() createdLearningGoal = new EventEmitter<LearningGoal>()

  constructor(private learningGoalService: LearningGoalService,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.learningGoalForm = this.formBuilder.group({
      goal: '',
      tasks: this.formBuilder.array([
        this.formBuilder.control('')
      ]),
      description: ''
    })
  }

  get tasks() {
    return this.learningGoalForm.get('tasks') as FormArray
  }

  addTask() {
    console.log("Adding a task")
    console.log(this.learningGoalForm.value)
    this.tasks.push(this.formBuilder.control(''))
  }

  onSubmit(learningGoalData) {
    console.log("Submitting learning goal creation form..")
    let learningGoal = new LearningGoal(learningGoalData.goal, [], 0,
      learningGoalData.description)
    learningGoalData.tasks.forEach(t => {
      let task = new Task(t, false)
      learningGoal.tasks.push(task)
    })
    this.learningGoalForm.reset()
    console.log(learningGoal)

    let newLearningGoal: LearningGoal
    this.learningGoalService.create(learningGoal).subscribe(
      (createdLearningGoal: LearningGoal) => {
        newLearningGoal = LearningGoal.fromJSON(createdLearningGoal);
      }, (error) => console.log(error),
      () => {
        this.createdLearningGoal.emit(newLearningGoal);
        this.router.navigate([''], {
          queryParams: {id: newLearningGoal.id}
        });
      });
  }


  ngOnInit() {
    // console.log("Rendering create..")
  }

}

// Some old/back-up functions
/*
createLearningGoal() {
  this.learningGoalService.create(new LearningGoal(this.learningGoalInput, this.taskInputs,
    0, this.descriptionInput)).subscribe(
    (newLearningGoal: LearningGoal) => {
      this.newLearningGoal = LearningGoal.fromJSON(newLearningGoal);
    }, (error) => console.log(error),
    () => {
      this.createdLearningGoal.emit(this.newLearningGoal);
      this.router.navigate([''], {
        queryParams: {id: this.newLearningGoal.id}
      });
    });

addTaskInput() {
    console.log("Adding a task")
    this.taskInputs.push(new Task(''))
}

trackByIdx(index: number, obj: any) {
    return index;
}
}*/
