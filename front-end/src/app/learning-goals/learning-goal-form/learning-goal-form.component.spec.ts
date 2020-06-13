import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningGoalFormComponent } from './learning-goal-form.component';

describe('LearningGoalFormComponent', () => {
  let component: LearningGoalFormComponent;
  let fixture: ComponentFixture<LearningGoalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningGoalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningGoalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
