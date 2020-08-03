import {Resource} from "./resource";

export class Unit {

  id: number
  name: string
  completed: boolean
  summary: string;
  resources: Resource[];

  constructor(name: string, completed?: boolean, summary?: string, id?: number,
              resources?: Resource[]) {
    this.id = id;
    this.name = name;
    this.completed = completed;
    this.summary = summary;
    this.resources = resources;
  }

  public addResource(resource: Resource) {
    this.resources.push(resource);
  }

  static fromJSON(data: Unit){
    if (data.resources) data.resources = data.resources.map(r => Resource.fromJSON(r));
    return new Unit(data.name, data.completed, data.summary, data.id, data.resources);
  }


}
