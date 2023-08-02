import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllmovieComponent } from './allmovie.component';

describe('AllmovieComponent', () => {
  let component: AllmovieComponent;
  let fixture: ComponentFixture<AllmovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllmovieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllmovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
