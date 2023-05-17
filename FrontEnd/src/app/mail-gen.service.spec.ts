import { TestBed } from '@angular/core/testing';

import { MailGenService } from './mail-gen.service';

describe('MailGenService', () => {
  let service: MailGenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MailGenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
