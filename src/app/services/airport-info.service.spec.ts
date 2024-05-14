import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AirportInfoService } from './airport-info.service';
import { environment } from '../../environments/environment';

describe('AirportInfoService', () => {
  let service: AirportInfoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AirportInfoService]
    });
    service = TestBed.inject(AirportInfoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return airport info for multiple airports', () => {
    const dummyIataCodes = ['JFK'];
    const dummyResponse = [
      {
        "id": 3406,
        "iata": "JFK",
        "icao": "KJFK",
        "name": "John F. Kennedy International Airport",
        "location": "New York City, New York, United States",
        "street_number": "",
        "street": "",
        "city": "",
        "county": "Queens County",
        "state": "New York",
        "country_iso": "US",
        "country": "United States",
        "postal_code": "11430",
        "phone": "+1 718-244-4444",
        "latitude": 40.64131,
        "longitude": -73.77814,
        "uct": -240,
        "website": "https://www.jfkairport.com/"
      },
    ];

    service.getAirportInfo(dummyIataCodes).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    dummyIataCodes.forEach((code, index) => {
      const req = httpMock.expectOne(`https://airport-info.p.rapidapi.com/airport?iata=${code}`);
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('X-RapidAPI-Key')).toBe(environment.rapidAPIKey);
      expect(req.request.headers.get('X-RapidAPI-Host')).toBe(environment.rapidAPIHost);
      req.flush(dummyResponse[index]);
    });
  });
});
