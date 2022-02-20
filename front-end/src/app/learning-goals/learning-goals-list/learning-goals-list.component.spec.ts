import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LearningGoalsListComponent } from './learning-goals-list.component';

describe('LearningGoalsListComponent', () => {
  let component: LearningGoalsListComponent;
  let fixture: ComponentFixture<LearningGoalsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningGoalsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningGoalsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
