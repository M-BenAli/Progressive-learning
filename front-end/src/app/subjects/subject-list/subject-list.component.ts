import {Component, Input, OnInit} from '@angular/core';
import {Subject} from "../../models/subject";
import {SubjectService} from "../../services/subject.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {


  @Input() subjects: Subject[];
  constructor(private subjectService: SubjectService, private router: Router) {
  }

  onDelete(subject: Subject, index: number) {
    let confirmed = confirm("Are you sure you would like to delete this subject?")
    if (confirmed) {
      this.subjectService.delete(subject).subscribe();
      this.subjects.splice(index, 1);
    }
  }

  onNewSubject() {
    this.router.navigate(['subjects/create']);
  }

  ngOnInit(): void {
    // console.log(this.subjects);
  }

}
