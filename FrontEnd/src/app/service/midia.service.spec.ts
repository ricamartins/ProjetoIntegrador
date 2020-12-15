import { TestBed } from '@angular/core/testing';

import { MidiaService } from './midia.service';

describe('MidiaService', () => {
  let service: MidiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MidiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
