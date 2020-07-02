import {Injectable} from '@angular/core';
import {User} from "../../models/user";
import {LearningGoal} from "../../models/learning-goal";

//TODO work on a better permission system
@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor() {
  }

  hasPermission(currentUser: User, learningGoal?: LearningGoal): boolean {
    const learningGoalUser: User = learningGoal ? learningGoal.user : null;
    if (currentUser?.admin === true) {
      return true;
    } else if (currentUser && currentUser.id === learningGoalUser?.id) {
      return true;
    } else if (!currentUser) {
      return false;
    }
  }
}
