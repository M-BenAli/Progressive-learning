import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Task} from "../models/task";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  constructor(private httpClient: HttpClient) { }

  // create(task: Task){
  //   this.httpClient.post(this.taskURL, task)
  // }

  delete(task: Task){
    return this.httpClient.delete(environment.apiUrl + `/api/tasks/${task.id}`, )
  }

}
