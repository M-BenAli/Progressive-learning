import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LearningGoalsRoutingModule} from './learning-goals-routing.module';
import {LearningGoalDetailComponent} from "./learning-goal-detail/learning-goal-detail.component";
import {LearningGoalsListComponent} from "./learning-goals-list/learning-goals-list.component";
import {LearningGoalCreateComponent} from "./learning-goal-create/learning-goal-create.component";
import {LearningGoalEditComponent} from "./learning-goal-edit/learning-goal-edit.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {LearningGoalFormComponent} from './learning-goal-form/learning-goal-form.component';
import {LearningGoalPipe} from "../pipes/learning-goal.pipe";
import {TasksModule} from "../tasks/tasks.module";

@NgModule({
  declarations: [
    LearningGoalsListComponent,
    LearningGoalDetailComponent,
    LearningGoalCreateComponent,
    LearningGoalEditComponent,
    LearningGoalFormComponent,
    LearningGoalPipe
  ],
  exports: [
    LearningGoalDetailComponent
  ],
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        LearningGoalsRoutingModule,
        TasksModule
    ]
})
export class LearningGoalsModule { }
