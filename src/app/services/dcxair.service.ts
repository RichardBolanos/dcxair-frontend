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

  // Function to retrieve countries data
  getCountries(): Observable<DcxAirResponse> {
    const headers: HttpHeaders = new HttpHeaders();
    const serviceUrl = environment.dcxairService;
    const countriesRoute = environment.flightsCountriesService;
    // Perform GET request to retrieve countries data
    return this.http.get<DcxAirResponse>(serviceUrl + countriesRoute, { headers });
  }

  // Function to retrieve flights data
  getFlights(request: DcxairFlightsRequest): Observable<DcxAirResponse> {
    const headers: HttpHeaders = new HttpHeaders();
    const serviceUrl = environment.dcxairService;
    const countriesRoute = environment.flightsServiceRoute;
    // Perform POST request to retrieve flights data
    return this.http.post<DcxAirResponse>(serviceUrl + countriesRoute, request, { headers });
  }
}
