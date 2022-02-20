import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LearningGoalCreateComponent } from './learning-goal-create.component';

describe('LearningGoalCreateComponent', () => {
  let component: LearningGoalCreateComponent;
  let fixture: ComponentFixture<LearningGoalCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningGoalCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningGoalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
