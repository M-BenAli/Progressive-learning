import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LearningGoal} from "../../models/learning-goal";
import {LearningGoalService} from "../../services/learning-goal.service";
import {Unit} from "../../models/unit";
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {SessionService} from "../../services/session/session.service";
import {SubjectService} from "../../services/subject.service";
import {Subject} from "../../models/subject";

@Component({
  selector: 'app-learning-goal-create',
  templateUrl: './learning-goal-create.component.html',
  styleUrls: ['./learning-goal-create.component.css']
})
export class LearningGoalCreateComponent implements OnInit {

  learningGoalForm: FormGroup;
  subjects: Subject[];
  selectedSubjectID: number;
  @Output() createdLearningGoal = new EventEmitter<LearningGoal>()
  @Output() cancel = new EventEmitter<boolean>()

  constructor(private learningGoalService: LearningGoalService,
              private subjectService: SubjectService,
              private sessionService: SessionService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder) {
    this.subjects = [];
    this.learningGoalForm = this.formBuilder.group({
      goal: '',
      units: this.formBuilder.array([
        this.formBuilder.control('')
      ]),
      description: '',
      subjectID: ''
    });

  }

  get units() {
    return this.learningGoalForm.get('units') as FormArray;
  }

  addUnit() {
    console.log("Adding a unit")
    console.log(this.learningGoalForm.value)
    this.units.push(this.formBuilder.control(''))
  }

  //Create the learning goal which will contain the form information
  onSubmit(learningGoalData) {
    console.log("Submitting learning goal creation form..")

    let subject = this.subjects.find(s => s.id === parseInt(learningGoalData.subjectID));
    let learningGoal = new LearningGoal(learningGoalData.goal, [], 0,
      this.sessionService.currentUser, subject, learningGoalData.description)
    learningGoalData.units.forEach(t => {
      let unit = new Unit(t, false)
      learningGoal.units.push(unit)
    })

    this.learningGoalForm.reset()
    console.log(learningGoal)
    //Create the new learningGoal and make a request to the server
    let newLearningGoal: LearningGoal;
    this.learningGoalService.create(learningGoal).subscribe(
      (createdLearningGoal: LearningGoal) => {
        newLearningGoal = LearningGoal.fromJSON(createdLearningGoal);
      }, (error) => console.log(error),
      () => {
        this.createdLearningGoal.emit(newLearningGoal);
      });
  }

  onCancel() {
    this.learningGoalForm.reset();
    this.cancel.emit(true);
  }


  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.selectedSubjectID = parseInt(params.get('subject-id'));
    }).unsubscribe();
    const user = this.sessionService.getCurrentUser();
    if (user) {
      this.subjectService.getUserSubjects(user.id).subscribe((subjects: []) => {
          subjects.forEach(s => this.subjects.push(Subject.fromJSON(s)));
        }, (error) => console.log(error),
        () => {

        })
    }

  }

}
