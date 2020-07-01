import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LearningGoal} from "../../models/learning-goal";
import {LearningGoalService} from "../../services/learning-goal.service";
import {Task} from "../../models/task";
import {Router} from "@angular/router";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {SessionService} from "../../services/session/session.service";

@Component({
  selector: 'app-learning-goal-create',
  templateUrl: './learning-goal-create.component.html',
  styleUrls: ['./learning-goal-create.component.css']
})
export class LearningGoalCreateComponent implements OnInit {

  learningGoalForm: FormGroup;
  @Output() createdLearningGoal = new EventEmitter<LearningGoal>()
  @Output() cancel = new EventEmitter<boolean>()

  constructor(private learningGoalService: LearningGoalService,
              private sessionService: SessionService,
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
    //Create the learning goal which will contain the form information
    let learningGoal = new LearningGoal(learningGoalData.goal, [], 0,
      this.sessionService.currentUser, learningGoalData.description)
    learningGoalData.tasks.forEach(t => {
      let task = new Task(t, false)
      learningGoal.tasks.push(task)
    })
    this.learningGoalForm.reset()
    // Check if the client logged in, if so assign the current user to the learning-goal
    if(this.sessionService.currentUser) {
      learningGoal.user = this.sessionService.currentUser;
    } else {
      learningGoal.user = null;
    }
    console.log(learningGoal)
    //Create the new learningGoal and make a request to the server
    let newLearningGoal: LearningGoal;
    this.learningGoalService.create(learningGoal).subscribe(
      (createdLearningGoal: LearningGoal) => {
        newLearningGoal = LearningGoal.fromJSON(createdLearningGoal);
      }, (error) => console.log(error),
      () => {
        newLearningGoal.user = this.sessionService.currentUser;
        this.createdLearningGoal.emit(newLearningGoal);
        this.router.navigate([''], {
          queryParams: {id: newLearningGoal.id}
        });
      });
  }

  onCancel() {
    this.learningGoalForm.reset();
    this.cancel.emit(true);
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
