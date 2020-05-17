import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LearningGoalsListComponent} from "./learning-goals-list/learning-goals-list.component";
import {LearningGoalDetailComponent} from "./learning-goal-detail/learning-goal-detail.component";
import {LearningGoalEditComponent} from "../components/forms/learning-goal-edit/learning-goal-edit.component";
import {LearningGoalCreateComponent} from "../components/forms/learning-goal-create/learning-goal-create.component";


const learningGoalsRoutes: Routes = [
    {path: 'learning-goals', component: LearningGoalsListComponent , children: [
  ]},

]

@NgModule({
  imports: [RouterModule.forChild(learningGoalsRoutes)],
  exports: [RouterModule]
})
export class LearningGoalsRoutingModule {



}
