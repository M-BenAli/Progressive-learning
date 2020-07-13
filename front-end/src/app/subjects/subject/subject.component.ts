import {Component, OnInit} from '@angular/core';
import {SubjectService} from "../../services/subject.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "../../models/subject";

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  public subject: Subject;

  constructor(private subjectService: SubjectService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const subjectID: number = parseInt(params.get('subject-id'));
      this.subjectService.get(subjectID).subscribe((subject) => {
          this.subject = Subject.fromJSON(subject);
        }, (error) => {
          // console.log(error)
          this.router.navigate(['**']);
        },
        () => {
          // console.log(this.subject);
        });
    });
  }

}
