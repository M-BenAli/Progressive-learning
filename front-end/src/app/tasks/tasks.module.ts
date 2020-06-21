import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutingModule } from './tasks-routing.module';
import { TaskComponent } from './task/task.component';
import {FormsModule} from "@angular/forms";
import {ResourcesComponent} from "../resources/resources.component";


@NgModule({
  declarations: [TaskComponent, ResourcesComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    FormsModule
  ]
})
export class TasksModule { }
