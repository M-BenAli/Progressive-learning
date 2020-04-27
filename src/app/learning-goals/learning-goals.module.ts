import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearningGoalsRoutingModule } from './learning-goals-routing.module';
import { LearningGoalDetailComponent} from "./learning-goal-detail/learning-goal-detail.component";
import { LearningGoalsListComponent } from "./learning-goals-list/learning-goals-list.component";
import { LearningGoalCreateComponent } from "../components/forms/learning-goal-create/learning-goal-create.component";
import { LearningGoalEditComponent } from "../components/forms/learning-goal-edit/learning-goal-edit.component";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  declarations: [
    LearningGoalsListComponent,
    LearningGoalDetailComponent,
    LearningGoalCreateComponent,
    LearningGoalEditComponent
  ],
  exports: [
    LearningGoalDetailComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    LearningGoalsRoutingModule,

  ]
})
export class LearningGoalsModule { }
