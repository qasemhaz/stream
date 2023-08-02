import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesvideoComponent } from './seriesvideo.component';

describe('SeriesvideoComponent', () => {
  let component: SeriesvideoComponent;
  let fixture: ComponentFixture<SeriesvideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeriesvideoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeriesvideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
