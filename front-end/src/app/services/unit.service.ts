import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Unit} from "../models/unit";
import {environment} from "../../environments/environment";
import {Resource} from "../models/resource";

@Injectable({
  providedIn: 'root'
})
export class UnitService {


  constructor(private httpClient: HttpClient) { }

  // create(task: Unit){
  //   this.httpClient.post(this.taskURL, task)
  // }

  update(unit: Unit){
    return this.httpClient.put(environment.apiUrl + `/units/${unit.id}`, unit);
  }

  get(id: number){
    return this.httpClient.get(environment.apiUrl + `/units/${id}`);
  }

  delete(unit: Unit){
    return this.httpClient.delete(environment.apiUrl + `/units/${unit.id}`);
  }

  getResources(unitID: number){
    return this.httpClient.get(environment.apiUrl + `/units/${unitID}/resources`);
  }

  addResource(unitID: number, resource: Resource){
    return this.httpClient.post(environment.apiUrl + `/units/${unitID}/resources`,
      resource);
  }

}
