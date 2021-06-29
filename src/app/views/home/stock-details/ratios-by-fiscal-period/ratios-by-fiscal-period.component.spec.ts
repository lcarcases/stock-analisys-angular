import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatiosByFiscalPeriodComponent } from './ratios-by-fiscal-period.component';

describe('RatiosByFiscalPeriodComponent', () => {
  let component: RatiosByFiscalPeriodComponent;
  let fixture: ComponentFixture<RatiosByFiscalPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatiosByFiscalPeriodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatiosByFiscalPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
