import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomepageComponent} from "./components/homepage/homepage.component";
import {LearningGoalDetailComponent} from "./learning-goals/learning-goal-detail/learning-goal-detail.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthenticationGuard} from "./services/authentication.guard";
import {LearningGoalsListComponent} from "./learning-goals/learning-goals-list/learning-goals-list.component";
import {LearningGoalEditComponent} from "./components/forms/learning-goal-edit/learning-goal-edit.component";
import {LearningGoalCreateComponent} from "./components/forms/learning-goal-create/learning-goal-create.component";


const routes: Routes = [
  {
    path: 'homepage', component: HomepageComponent,
    children: [
      {path: ':learning-goals', component: LearningGoalDetailComponent}
    ]/*, canActivate: [AuthenticationGuard]*/
  },
  {path: 'login', component: LoginComponent },
  {path: '', redirectTo: 'homepage', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
