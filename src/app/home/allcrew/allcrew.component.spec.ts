import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcrewComponent } from './allcrew.component';

describe('AllcrewComponent', () => {
  let component: AllcrewComponent;
  let fixture: ComponentFixture<AllcrewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllcrewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllcrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
