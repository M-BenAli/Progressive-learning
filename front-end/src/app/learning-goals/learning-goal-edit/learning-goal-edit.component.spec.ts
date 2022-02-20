import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LearningGoalEditComponent } from './learning-goal-edit.component';

describe('LearningGoalEditComponent', () => {
  let component: LearningGoalEditComponent;
  let fixture: ComponentFixture<LearningGoalEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningGoalEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningGoalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
