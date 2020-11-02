import { TestBed } from '@angular/core/testing';

import { MedjoinService } from './medjoin.service';

describe('MedjoinService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MedjoinService = TestBed.get(MedjoinService);
    expect(service).toBeTruthy();
  });
});
