import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SubjectComponent} from "./subject/subject.component";


const subjectsRoutes: Routes = [
  {path: 'subjects/:id/learning-goals', component: SubjectComponent}
]

@NgModule({
  imports: [RouterModule.forChild(subjectsRoutes)],
  exports: [RouterModule],
})
export class SubjectsRoutingModule {

}
