import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../services/task.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Task} from 'src/app/models/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  public task: Task;
  public editTaskName: boolean;

  constructor(private taskService: TaskService,
              private activatedRoute: ActivatedRoute) {
    this.editTaskName = false;
  }

/*  onTaskNameChange(){
      this.taskService.update(this.task).subscribe((task: Task) => {
        this.task = task;
        console.log(this.task);
      }, error => {
        console.log(error);
      }, () => {
        console.log("Updated task");
      })
  }*/

  onSave(){
    this.taskService.update(this.task).subscribe((task: Task) => {
      this.task = task;
    }, error => {
      console.log(error);
    }, () => {
      console.log("Updated task", this.task);
    })
  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.taskService.get(params.id).subscribe((task: Task) => {
        this.task = task;
      }, (error) => {
        console.log(error);
      });
    });
  }

}
