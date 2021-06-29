import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatiosByCategoryComponent } from './ratios-by-category.component';

describe('RatiosByCategoryComponent', () => {
  let component: RatiosByCategoryComponent;
  let fixture: ComponentFixture<RatiosByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatiosByCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatiosByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
