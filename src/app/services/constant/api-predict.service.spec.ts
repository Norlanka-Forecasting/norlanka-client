import { TestBed } from '@angular/core/testing';

import { ApiPredictService } from './api-predict.service';

describe('ApiPredictService', () => {
  let service: ApiPredictService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPredictService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
