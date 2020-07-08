import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubjectListComponent} from "./subject-list/subject-list.component";
import {SubjectComponent} from './subject/subject.component';
import {RouterModule} from "@angular/router";
import {SubjectsRoutingModule} from "./subjects-routing.module";

@NgModule({
  declarations: [SubjectListComponent, SubjectComponent],
  exports: [
    SubjectListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SubjectsRoutingModule
  ]
})
export class SubjectsModule { }
