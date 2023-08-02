import { TestBed } from '@angular/core/testing';

import { CrewseriesmovieService } from './crewseriesmovie.service';

describe('CrewseriesmovieService', () => {
  let service: CrewseriesmovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrewseriesmovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
