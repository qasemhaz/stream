import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllseriesComponent } from './allseries.component';

describe('AllseriesComponent', () => {
  let component: AllseriesComponent;
  let fixture: ComponentFixture<AllseriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllseriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllseriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
