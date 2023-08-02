import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChhhComponent } from './chhh.component';

describe('ChhhComponent', () => {
  let component: ChhhComponent;
  let fixture: ComponentFixture<ChhhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChhhComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChhhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
