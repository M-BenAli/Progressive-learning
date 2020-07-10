import {Component, Input, OnInit} from '@angular/core';
import {LearningGoalService} from "../../services/learning-goal.service";
import {LearningGoal} from "../../models/learning-goal";
import {ActivatedRoute, Router} from "@angular/router";
import {SessionService} from "../../services/session/session.service";

@Component({
  selector: 'app-learning-goal',
  templateUrl: './learning-goals-list.component.html',
  styleUrls: ['./learning-goals-list.component.css']
})
export class LearningGoalsListComponent implements OnInit {

  @Input() inputLearningGoals: LearningGoal[];
  public learningGoals: LearningGoal[];
  public selectedLearningGoal: LearningGoal;
  public renderingCreate: boolean;

  public searchQuery: string;
  public isEditing: boolean;
  public loading: boolean;

  constructor(private learningGoalService: LearningGoalService, private sessionService: SessionService,
              private activatedRoute: ActivatedRoute, private router: Router) {
    this.learningGoals = [];
    this.selectedLearningGoal = null;
    this.searchQuery = null;
    this.renderingCreate = false;
  }

  renderLearningGoal(learningGoal: LearningGoal) {
    this.renderingCreate = false
    this.selectedLearningGoal = learningGoal
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute,
      queryParams: {id: this.selectedLearningGoal.id}
    })
  }

  renderCreate() {
    this.selectedLearningGoal = null
    this.renderingCreate = true
    this.router.navigate(['create'], {
      relativeTo: this.activatedRoute
    })
  }


  onCreate(learningGoal: LearningGoal) {
    console.log("Created new learning goal: ", learningGoal)
    this.learningGoals.push(learningGoal)
    this.renderingCreate = false;
    this.selectedLearningGoal = learningGoal
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute,
      queryParams: {id: learningGoal.id}
    })
    console.log(this.learningGoals)
  }

  onCancelCreate(cancelled: boolean) {
    if (cancelled) {
      this.renderingCreate = false;
      this.router.navigate(['./'], {
        relativeTo: this.activatedRoute
      });
    }
  }

  onCancel(cancelled: boolean) {
    if (cancelled) {
      this.selectedLearningGoal = null;
      this.router.navigate(['./'], {
        relativeTo: this.activatedRoute
      });
    }
  }

  onEdit(editing: boolean) {
    this.isEditing = editing;
  }

  onSave(updatedLearningGoal: LearningGoal) {
    // this.selectedLearningGoal = updatedLearningGoal;
    let index = this.learningGoals.indexOf(this.selectedLearningGoal);
    this.learningGoals[index] = updatedLearningGoal;
  }

  onDelete(deleted: boolean) {
    console.log('Deleting learning goal..');
    if (deleted) {
      let index = this.learningGoals.findIndex(lg => lg.id === this.selectedLearningGoal.id);
      this.learningGoals.splice(index, 1)
      this.selectedLearningGoal = null
      this.router.navigate(['./'], {
        relativeTo: this.activatedRoute
      });
    }
  }

  ngOnInit() {
    this.loading = true;
    let currentUser = this.sessionService.getCurrentUser();
    if (currentUser && !this.inputLearningGoals) {
      this.learningGoalService.getUserLearningGoals(currentUser?.id).subscribe((learningGoals: LearningGoal[]) => {
          this.learningGoals = learningGoals.map(lg => LearningGoal.fromJSON(lg))
        }, error => {
          console.log(error)
        }, () => {
          this.loading = false;
          console.log(this.learningGoals)
        }
      );
    } else if(!this.inputLearningGoals) {
      this.learningGoalService.getAll('createdby=Guest').subscribe((learningGoals: LearningGoal[]) => {
          this.learningGoals = learningGoals.map(lg => LearningGoal.fromJSON(lg))
        }, error => {
          console.log(error)
        }, () => {
          this.loading = false;
          console.log(this.learningGoals)
        }
      );
    }

    if (this.inputLearningGoals) {
      this.learningGoals = this.inputLearningGoals
      this.loading = false;
    }
  }

}
