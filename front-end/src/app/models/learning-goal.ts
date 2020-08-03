import {Unit} from "./unit";
import {User} from "./user";
import {Subject} from "./subject";

export class LearningGoal {

  id: number;
  goal: string;
  description: string;
  units: Unit[];
  progress: number;
  subject: Subject;
  user: User;

  constructor(goal: string, units: Unit[], progress: number,
              user?: User, subject?: Subject,
              description?: string, id?: number) {
    this.goal = goal;
    this.units = units;
    this.progress = progress;
    this.description = description;
    this.id = id
    this.user = user;
    this.subject = subject;
  }

  public getId(): number {
    return this.id
  }

  public addUnit(unit: Unit): void {
    this.units.push(unit)
  }

  public deleteTask(unit: Unit, index?: number): void {
    if (index) {
      this.units.splice(index, 1);
    } else if(unit.id) {
      let unitIndex = this.units.findIndex(t => t.id === unit.id);
      this.units.splice(unitIndex, 1);
    }
  }

  public calculateProgress(): void {
    let completedTasks: number = 0;
    let percentage: number = 0;
    let units = this.units
    units.forEach(unit => {
      if (unit.completed) {
        completedTasks++
      }
    })

    if (units.length > 0) {
      percentage = (100 / units.length) * completedTasks
    }
    this.progress = Math.round((percentage + Number.EPSILON) * 100) / 100
  }

  static fromJSON(data: LearningGoal): LearningGoal {
    data.units = data.units ? data.units.map(unit => Unit.fromJSON(unit)) : null;
    return new LearningGoal(data.goal, data.units, data.progress, data.user, data.subject,
      data.description, data.id)
  }

  static deepCopy(learningGoal: LearningGoal) {
    return Object.assign(new LearningGoal(learningGoal.goal, learningGoal.units,
      learningGoal.progress, learningGoal.user, learningGoal.subject, learningGoal.description,
      learningGoal.id), learningGoal)
  }

}
