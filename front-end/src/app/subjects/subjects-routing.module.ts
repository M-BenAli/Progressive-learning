import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SubjectComponent} from "./subject/subject.component";
import {LearningGoalCreateComponent} from "../learning-goals/learning-goal-create/learning-goal-create.component";
import {LearningGoalEditComponent} from "../learning-goals/learning-goal-edit/learning-goal-edit.component";
import {SubjectCreateComponent} from "./subject-create/subject-create.component";


const subjectsRoutes: Routes = [
  {path: 'subjects/create', component: SubjectCreateComponent },
  {path: 'subjects/:id/learning-goals', component: SubjectComponent, children: [
      {path: 'create', component: LearningGoalCreateComponent},
      {path: 'edit', component: LearningGoalEditComponent},
    ]}
]

@NgModule({
  imports: [RouterModule.forChild(subjectsRoutes)],
  exports: [RouterModule],
})
export class SubjectsRoutingModule {

}
