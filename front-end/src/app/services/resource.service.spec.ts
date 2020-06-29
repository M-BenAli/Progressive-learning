import { TestBed } from '@angular/core/testing';

import { ResourceService } from './resources.service';

describe('ResourcesService', () => {
  let service: ResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
