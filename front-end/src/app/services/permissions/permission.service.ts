import {Injectable} from '@angular/core';
import {User} from "../../models/user";

//TODO work on a better permission system
@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor() {
  }

  hasPermission(currentUser: User): boolean {
    // const learningGoalUser: User = learningGoal ? learningGoal.user : null;
    if (currentUser?.admin === true) {
      return true;
    } else if (currentUser) {
      return true;
    } else if (!currentUser) {
      return false;
    }
  }
}
