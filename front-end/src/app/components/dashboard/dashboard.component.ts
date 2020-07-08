import {Component, OnInit} from '@angular/core';
import {Subject} from "../../models/subject";
import {SubjectService} from "../../services/subject.service";
import {SessionService} from "../../services/session/session.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  mockSubjects: object[] = [
    {name: 'subject1'},
    {name: 'subject2'},
    {name: 'subject3'},
    {name: 'subject4'},
    {name: 'subject5'},
    {name: 'subject6'},
    {name: 'subject7'},
    {name: 'subject8'},
    {name: 'subject9'},
    {name: 'subject10'},
  ]

  subjects: Subject[];
  constructor(private subjectService: SubjectService,
              private sessionService: SessionService) {
    this.subjects = [];

  }

  ngOnInit(): void {
    const user = this.sessionService.getCurrentUser();
    this.subjectService.getUserSubjects(user.id)
      .subscribe((subjects: []) => {
        subjects.forEach(subject => {
          this.subjects.push(Subject.fromJSON(subject))
        })
      }, (error) => {
        console.log(error);
      }, () => {
        console.log(this.subjects);
      })
  }

}
