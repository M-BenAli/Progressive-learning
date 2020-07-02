import {Pipe, PipeTransform} from '@angular/core';
import {LearningGoal} from "../models/learning-goal";

@Pipe({
  name: 'learningGoal'
})
export class LearningGoalPipe implements PipeTransform {

  transform(learningGoals: LearningGoal[], searchQuery: string): unknown {
    if (searchQuery) {
      return learningGoals.filter((learningGoal: LearningGoal) => {
       return learningGoal.goal.toLowerCase().includes(searchQuery.toLowerCase())
      });
    } else return learningGoals
  }

}
