import {LearningGoal} from "./learning-goal";

export class Subject {
  id: number;
  name: string;
  description: string;
  learningGoals: LearningGoal[];

  constructor(name: string, learningGoals: LearningGoal[],
              description?: string, id?: number,) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.learningGoals = learningGoals;
  }

  static fromJSON(data): Subject {
    data.learningGoals = data.learningGoals ? data.learningGoals.map(lGoal => LearningGoal.fromJSON(lGoal)) : null;
    return new Subject(data.name, data.learningGoals, data.description, data.id);
  }


}
