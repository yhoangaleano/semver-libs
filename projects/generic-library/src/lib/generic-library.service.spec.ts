import { TestBed } from '@angular/core/testing';

import { GenericLibraryService } from './generic-library.service';

describe('GenericLibraryService', () => {
  let service: GenericLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
