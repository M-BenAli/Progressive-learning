import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SubjectListComponent} from './subject-list.component';

describe('CategoryListComponent', () => {
  let component: SubjectListComponent;
  let fixture: ComponentFixture<SubjectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
