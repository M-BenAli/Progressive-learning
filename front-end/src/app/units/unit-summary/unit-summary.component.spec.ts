import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UnitSummaryComponent} from './unit-summary.component';

describe('UnitSummaryComponent', () => {
  let component: UnitSummaryComponent;
  let fixture: ComponentFixture<UnitSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
