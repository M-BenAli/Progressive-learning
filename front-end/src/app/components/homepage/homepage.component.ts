import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LearningGoalService} from "../../services/learning-goal.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {


  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              public learningGoalService: LearningGoalService) {

  }



  ngOnInit() {
  }

}
