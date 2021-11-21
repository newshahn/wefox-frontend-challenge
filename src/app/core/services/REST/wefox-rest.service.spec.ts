import { TestBed } from '@angular/core/testing';

import { WefoxRESTService } from './wefox-rest.service';

describe('WefoxRESTService', () => {
  let service: WefoxRESTService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WefoxRESTService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
