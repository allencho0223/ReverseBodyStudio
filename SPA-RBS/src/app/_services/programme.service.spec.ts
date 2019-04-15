/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProgrammeService } from './programme.service';

describe('Service: Programme', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProgrammeService]
    });
  });

  it('should ...', inject([ProgrammeService], (service: ProgrammeService) => {
    expect(service).toBeTruthy();
  }));
});
