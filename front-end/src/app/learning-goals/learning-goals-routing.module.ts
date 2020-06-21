import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LearningGoalsListComponent} from "./learning-goals-list/learning-goals-list.component";
import {LearningGoalDetailComponent} from "./learning-goal-detail/learning-goal-detail.component";
import {LearningGoalEditComponent} from "./learning-goal-edit/learning-goal-edit.component";
import {LearningGoalCreateComponent} from "./learning-goal-create/learning-goal-create.component";


const learningGoalsRoutes: Routes = [
  {path: 'learning-goals', component: LearningGoalsListComponent , children: [
      {path: 'create', component: LearningGoalCreateComponent},
      {path: 'edit', component: LearningGoalEditComponent},
    ]}
]

@NgModule({
  imports: [RouterModule.forChild(learningGoalsRoutes)],
  exports: [RouterModule],
})
export class LearningGoalsRoutingModule {

}
