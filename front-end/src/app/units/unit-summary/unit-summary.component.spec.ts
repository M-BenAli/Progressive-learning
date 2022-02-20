import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {UnitSummaryComponent} from './unit-summary.component';

describe('UnitSummaryComponent', () => {
  let component: UnitSummaryComponent;
  let fixture: ComponentFixture<UnitSummaryComponent>;

  beforeEach(waitForAsync(() => {
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
