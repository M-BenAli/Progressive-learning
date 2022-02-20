import {LearningGoal} from "../models/learning-goal";

export abstract class LearningGoalServiceInterface {

  abstract get(id: number);
  abstract getAll(createdBy: string);

  abstract getUserLearningGoals(userID: number);

  abstract create(learningGoal: LearningGoal);

  abstract update(id: number, learningGoal: LearningGoal);

  abstract delete(learningGoal: LearningGoal);

}
