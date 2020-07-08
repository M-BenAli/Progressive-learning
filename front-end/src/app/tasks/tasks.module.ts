import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TasksRoutingModule} from './tasks-routing.module';
import {TaskComponent} from './task/task.component';
import {FormsModule} from "@angular/forms";
import {ResourcesComponent} from "../resources/resources.component";
import {TaskListComponent} from './task-list/task-list.component';
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TaskSummaryComponent} from './task-summary/task-summary.component';
import {QuillModule} from "ngx-quill";


@NgModule({
    declarations: [TaskComponent, ResourcesComponent, TaskListComponent, TaskSummaryComponent],
    exports: [
        TaskListComponent
    ],
    imports: [
        CommonModule,
        TasksRoutingModule,
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        QuillModule.forRoot()

    ]
})
export class TasksModule { }
