import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearningGoalsRoutingModule } from './learning-goals-routing.module';
import { LearningGoalDetailComponent} from "./learning-goal-detail/learning-goal-detail.component";
import { LearningGoalsListComponent } from "./learning-goals-list/learning-goals-list.component";
import { LearningGoalCreateComponent } from "./learning-goal-create/learning-goal-create.component";
import { LearningGoalEditComponent } from "./learning-goal-edit/learning-goal-edit.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import { LearningGoalFormComponent } from './learning-goal-form/learning-goal-form.component';

@NgModule({
  declarations: [
    LearningGoalsListComponent,
    LearningGoalDetailComponent,
    LearningGoalCreateComponent,
    LearningGoalEditComponent,
    LearningGoalFormComponent
  ],
  exports: [
    LearningGoalDetailComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LearningGoalsRoutingModule
  ]
})
export class LearningGoalsModule { }
