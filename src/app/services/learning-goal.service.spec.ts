import { TestBed } from '@angular/core/testing';

import { LearningGoalService } from './learning-goal.service';

describe('LearningGoalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LearningGoalService = TestBed.get(LearningGoalService);
    expect(service).toBeTruthy();
  });
});
