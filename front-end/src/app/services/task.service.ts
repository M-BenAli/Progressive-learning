import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Task} from "../models/task";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  readonly taskURL: string = '/tasks'

  constructor(private httpClient: HttpClient) { }

  create(task: Task){
    this.httpClient.post(this.taskURL, task)
  }


}
