import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubjectListComponent} from "./subject-list/subject-list.component";
import {SubjectComponent} from './subject/subject.component';
import {RouterModule} from "@angular/router";
import {SubjectsRoutingModule} from "./subjects-routing.module";
import {LearningGoalsModule} from "../learning-goals/learning-goals.module";
import {SubjectCreateComponent} from './subject-create/subject-create.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [SubjectListComponent, SubjectComponent, SubjectCreateComponent],
  exports: [
    SubjectListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SubjectsRoutingModule,
    LearningGoalsModule,
    ReactiveFormsModule
  ]
})
export class SubjectsModule { }
