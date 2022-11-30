import { TestBed } from '@angular/core/testing';

import { ApiForecastService } from './api-forecast.service';

describe('ApiForecastService', () => {
  let service: ApiForecastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiForecastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
