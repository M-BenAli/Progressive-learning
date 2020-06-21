import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Task} from "../models/task";
import {environment} from "../../environments/environment";
import {Resource} from "../models/resource";

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  constructor(private httpClient: HttpClient) { }

  // create(task: Task){
  //   this.httpClient.post(this.taskURL, task)
  // }

  update(task: Task){
    return this.httpClient.put(environment.apiUrl + `/api/tasks/${task.id}`, task);
  }

  get(id: number){
    return this.httpClient.get(environment.apiUrl + `/api/tasks/${id}`);
  }

  delete(task: Task){
    return this.httpClient.delete(environment.apiUrl + `/api/tasks/${task.id}`);
  }

  getResources(taskID: number){
    return this.httpClient.get(environment.apiUrl + `/api/tasks/${taskID}/resources`);
  }

  addResource(taskID: number, resource: Resource){
    return this.httpClient.post(environment.apiUrl + `/api/tasks/${taskID}/resources`,
      resource);
  }

}
