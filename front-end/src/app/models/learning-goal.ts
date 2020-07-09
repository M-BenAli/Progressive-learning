import {Task} from "./task";
import {User} from "./user";
import {Subject} from "./subject";

export class LearningGoal {

  id: number;
  goal: string;
  description: string;
  tasks: Task[];
  progress: number;
  subject: Subject;
  user: User;

  constructor(goal: string, tasks: Task[], progress: number,
              user?: User, subject?: Subject,
              description?: string, id?: number) {
    this.goal = goal;
    this.tasks = tasks;
    this.progress = progress;
    this.description = description;
    this.id = id
    this.user = user;
    this.subject = subject;
  }

  public getId(): number {
    return this.id
  }

  public addTask(task: Task): void {
    this.tasks.push(task)
  }

  public deleteTask(task: Task, index?: number): void {
    if (index) {
      this.tasks.splice(index, 1);
    } else if(task.id) {
      let taskIndex = this.tasks.findIndex(t => t.id === task.id);
      this.tasks.splice(taskIndex, 1);
    }
  }

  public calculateProgress(): void {
    let completedTasks: number = 0;
    let percentage: number = 0;
    let tasks = this.tasks
    tasks.forEach(task => {
      if (task.completed) {
        completedTasks++
      }
    })

    if (tasks.length > 0) {
      percentage = (100 / tasks.length) * completedTasks
    }
    this.progress = Math.round((percentage + Number.EPSILON) * 100) / 100
  }

  static fromJSON(data: LearningGoal): LearningGoal {
    data.tasks = data.tasks ? data.tasks.map(task => Task.fromJSON(task)) : null;
    return new LearningGoal(data.goal, data.tasks, data.progress, data.user, data.subject,
      data.description, data.id)
  }

  static deepCopy(learningGoal: LearningGoal) {
    return Object.assign(new LearningGoal(learningGoal.goal, learningGoal.tasks,
      learningGoal.progress, learningGoal.user, learningGoal.subject, learningGoal.description,
      learningGoal.id), learningGoal)
  }

}
