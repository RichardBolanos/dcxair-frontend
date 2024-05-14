import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { DcxAirResponse } from '../models/dto/dcxairResponses.interface';
import { DcxairFlightsRequest } from '../models/dto/dcxairRequest.interface';

@Injectable({
  providedIn: 'root',
})
export class DcxairService {
  constructor(private http: HttpClient) {}

  getCountries(): Observable<DcxAirResponse> {
    const headers: HttpHeaders = new HttpHeaders();
    const serviceUrl = environment.dcxairService;
    const countriesRoute = environment.flightsCountriesService;
    return this.http.get<DcxAirResponse>(serviceUrl + countriesRoute, { headers });
  }
  getFlights(request: DcxairFlightsRequest): Observable<DcxAirResponse> {
    const headers: HttpHeaders = new HttpHeaders();
    const serviceUrl = environment.dcxairService;
    const countriesRoute = environment.flightsServiceRoute;
    return this.http.post<DcxAirResponse>(serviceUrl + countriesRoute, request, { headers });
  }
}
