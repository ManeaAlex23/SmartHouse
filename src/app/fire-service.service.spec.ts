import { TestBed } from '@angular/core/testing';

import { FireServiceService } from './fire-service.service';

describe('FireServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FireServiceService = TestBed.get(FireServiceService);
    expect(service).toBeTruthy();
  });
});
