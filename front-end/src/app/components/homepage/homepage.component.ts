import { Component, OnInit } from '@angular/core';
import {LearningGoal} from "../../models/learning-goal";
import {ActivatedRoute, Router} from "@angular/router";
import {LearningGoalService} from "../../services/learning-goal.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  // learningGoals: LearningGoal[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private learningGoalService: LearningGoalService) {
    // this.learningGoals = [];

  }

  public onSelection(index: number, learningGoal: LearningGoal) {
    // console.log(index, learningGoal)
    this.router.navigate(['learning-goals'], {
      relativeTo: this.activatedRoute,
      queryParams: {id: learningGoal.id}
    })

  }

  ngOnInit() {
    this.learningGoalService.getAll();
  }

}
