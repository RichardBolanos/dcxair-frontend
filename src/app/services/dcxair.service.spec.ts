import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DcxairService } from './dcxair.service';
import { environment } from '../../environments/environment';
import { DcxAirResponse } from '../models/dto/dcxairResponses.interface';
import { DcxairFlightsRequest } from '../models/dto/dcxairRequest.interface';

describe('DcxairService', () => {
  let service: DcxairService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DcxairService],
    });
    service = TestBed.inject(DcxairService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return countries', () => {
    const dummyResponse: DcxAirResponse = {};
    service.getCountries().subscribe((response) => {
      expect(response).toEqual(dummyResponse);
    });
    const req = httpMock.expectOne(
      `${environment.dcxairService}${environment.flightsCountriesService}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('should return flights', () => {
    const dummyRequest: DcxairFlightsRequest = {
      currency: 'COP',
      destination: "BOG",
      oneWay: false,
      origin: "BCN"
    };
    const dummyResponse = {
      /* Dummy response object here */
    };
    service.getFlights(dummyRequest).subscribe((response) => {
      expect(response).toBeDefined();
    });
    const req = httpMock.expectOne(
      `${environment.dcxairService}${environment.flightsServiceRoute}`
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBeDefined();
    req.flush(dummyResponse);
  });
});
