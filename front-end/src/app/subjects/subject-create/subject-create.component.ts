import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {SessionService} from "../../services/session/session.service";
import {Subject} from "../../models/subject";
import {SubjectService} from "../../services/subject.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-subject-create',
  templateUrl: './subject-create.component.html',
  styleUrls: ['./subject-create.component.css']
})
export class SubjectCreateComponent implements OnInit {

  public subjectForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private sessionService: SessionService,
              private subjectService: SubjectService) {
    this.subjectForm = this.formBuilder.group({
      name: '',
      description: '',
      userId: this.sessionService.getCurrentUser()?.id
    });
  }

  onSubmit(subjectFormData: Subject) {
    console.log(subjectFormData);
    this.subjectService.create(subjectFormData).subscribe(s => {
      const subject = Subject.fromJSON(s);
      console.log(subject);
    }, (error) => {
      console.log(error);
    }, () => {
      this.router.navigate(['dashboard']);

    });

  }

  ngOnInit(): void {
  }

}
