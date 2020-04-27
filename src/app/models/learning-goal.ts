import {Task} from "./task";

export class LearningGoal {

  id: number;
  goal: string;
  description: string;
  tasks: Task[];
  progress: number;

  constructor(id: number, goal: string, tasks: Task[], progress: number, description?: string) {
    this.id = id;
    this.goal = goal;
    this.tasks = tasks;
    this.progress = 0;
    this.description = description;
  }

  static deepCopy(learningGoal: LearningGoal) {
    return Object.assign(new LearningGoal(learningGoal.id, learningGoal.goal,
      learningGoal.tasks, learningGoal.progress, learningGoal.description), learningGoal)
  }


}
