import {Component, OnInit} from '@angular/core';
import {SubjectService} from "../../services/subject.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {


  constructor(private subjectService: SubjectService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const subjectID: number = parseInt(params.get('id'));
      this.subjectService.get(subjectID).subscribe((subject) => {
          console.log(subject);
        }, (error) => console.log(error),
        () => {

        });

    });
  }

}
