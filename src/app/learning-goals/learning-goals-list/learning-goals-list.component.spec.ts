import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningGoalsListComponent } from './learning-goals-list.component';

describe('LearningGoalsListComponent', () => {
  let component: LearningGoalsListComponent;
  let fixture: ComponentFixture<LearningGoalsListComponent>;

  beforeEach(async(() => {
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
