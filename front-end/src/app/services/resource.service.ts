import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Resource} from "../models/resource";

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private httpClient: HttpClient) {

  }

  public get(id: number){
    return this.httpClient.get(`${environment.apiUrl}/resources/${id}`);
  }

  public update(resource: Resource){
    return this.httpClient.put(`${environment.apiUrl}/resources`, resource);
  }

  public create(resource: Resource){
    return this.httpClient.post(`${environment.apiUrl}/resources`, resource);
  }

  public delete(id: number){
    return this.httpClient.delete(`${environment.apiUrl}/resources/${id}`);
  }



}
