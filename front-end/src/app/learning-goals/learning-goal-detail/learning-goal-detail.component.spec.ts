import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningGoalDetailComponent } from './learning-goal-detail.component';

describe('LearningGoalDetailComponent', () => {
  let component: LearningGoalDetailComponent;
  let fixture: ComponentFixture<LearningGoalDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningGoalDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningGoalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
