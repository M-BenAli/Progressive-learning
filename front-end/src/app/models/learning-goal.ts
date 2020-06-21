import { Task } from "./task";

export class LearningGoal {

  id: number;
  goal: string;
  description: string;
  tasks: Task[];
  progress: number;

  constructor(goal: string, tasks: Task[], progress: number, description?: string, id?: number) {
    this.goal = goal;
    this.tasks = tasks;
    this.progress = progress;
    this.description = description;
    this.id = id
  }

  public getId(): number{
    return this.id
  }

  public addTask(task: Task): void{
    this.tasks.push(task)
  }

  public deleteTask(task: Task, index: number): void {
    this.tasks.splice(index, 1)
  }

  public calculateProgress(): void{
    let completedTasks: number = 0
    let tasks = this.tasks
    tasks.forEach(task => {
      if (task.completed) {
        completedTasks++
      }
    })

    let percentage = (100 / tasks.length) * completedTasks
    this.progress = Math.round((percentage + Number.EPSILON) * 100) / 100
  }

  static fromJSON(data: LearningGoal): LearningGoal{
    data.tasks = data.tasks.map(task => Task.fromJSON(task))
    return new LearningGoal(data.goal, data.tasks, data.progress, data.description,
      data.id)
  }

  static deepCopy(learningGoal: LearningGoal) {
    return Object.assign(new LearningGoal(learningGoal.goal, learningGoal.tasks,
      learningGoal.progress, learningGoal.description, learningGoal.id), learningGoal)
  }

}
