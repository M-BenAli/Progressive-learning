import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../services/task.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Task} from 'src/app/models/task';
import {PermissionService} from "../../services/permissions/permission.service";
import {SessionService} from "../../services/session/session.service";
import {Resource} from "../../models/resource";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {


  readonly DESCRIPTION_PLACEHOLDER: string = 'Summarize the most important points(preferably in your own words).';
  public task: Task;
  public editTaskName: boolean;
  public saving: boolean;

  constructor(private taskService: TaskService, public permissionsService: PermissionService,
              public sessionService: SessionService,
              private activatedRoute: ActivatedRoute) {
    this.editTaskName = false;
  }

  onSave(){
    this.saving = true;
    this.taskService.update(this.task).subscribe((task: Task) => {
      this.task = task;
    }, error => {
      console.log(error);
    }, () => {
      console.log("Updated task", this.task);
      this.saving = false;
    })
  }

  deleteResource(resource: Resource){
    const index = this.task.resources.findIndex(r => r.id === resource.id);
    this.task.resources.splice(index, 1);
  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.taskService.get(params.id).subscribe((task: Task) => {
        this.task = Task.fromJSON(task);
      }, (error) => {
        console.log(error);
      });
    });
  }

}
