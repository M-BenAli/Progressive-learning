import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LearningGoal} from "../../../models/learning-goal";
import {LearningGoalService} from "../../../services/learning-goal.service";
import {Task} from "../../../models/task";
import {Router} from "@angular/router";

@Component({
  selector: 'app-learning-goal-create',
  templateUrl: './learning-goal-create.component.html',
  styleUrls: ['./learning-goal-create.component.css']
})
export class LearningGoalCreateComponent implements OnInit {

  taskInputs: Task[];
  learningGoalInput: string;
  descriptionInput: string
  @Output() createdLearningGoal = new EventEmitter<LearningGoal>()

  private newLearningGoal: LearningGoal;

  constructor(private learningGoalService: LearningGoalService,
              private router: Router) {
    this.taskInputs = []
    this.learningGoalInput = ''
    this.descriptionInput = ''
  }

  addTaskInput(){
    console.log("Adding a task")
    this.taskInputs.push(new Task(''))
  }

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
  }

  trackByIdx(index: number, obj: any){
    return index;
  }

  ngOnInit() {
    // console.log("Rendering create..")
  }

}
