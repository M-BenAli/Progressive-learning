import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomepageComponent} from "./components/homepage/homepage.component";
import {LearningGoalDetailComponent} from "./learning-goals/learning-goal-detail/learning-goal-detail.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthenticationGuard} from "./services/authentication.guard";
import {LearningGoalsListComponent} from "./learning-goals/learning-goals-list/learning-goals-list.component";
import {LearningGoalEditComponent} from "./learning-goals/learning-goal-edit/learning-goal-edit.component";
import {LearningGoalCreateComponent} from "./learning-goals/learning-goal-create/learning-goal-create.component";


const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: '', redirectTo: 'learning-goals', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
