import {Resource} from "./resource";
import {LearningGoal} from "./learning-goal";

export class Task {

  id: number
  name: string
  completed: boolean
  summary: string;
  resources: Resource[];
  learningGoal: LearningGoal;

  constructor(name: string, completed?: boolean, summary?: string, id?: number,
              resources?: Resource[], learningGoal?: LearningGoal) {
    this.id = id;
    this.name = name;
    this.completed = completed;
    this.summary = summary;
    this.resources = resources;
    this.learningGoal = learningGoal;
  }

  public addResource(resource: Resource) {
    this.resources.push(resource);
  }

  static fromJSON(data: Task){
    if (data.resources) data.resources = data.resources.map(r => Resource.fromJSON(r));
    if (data.learningGoal) data.learningGoal = LearningGoal.fromJSON(data.learningGoal);
    return new Task(data.name, data.completed, data.summary, data.id, data.resources,
      data.learningGoal);
  }


}
