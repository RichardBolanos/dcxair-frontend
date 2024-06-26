import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Airport } from '../models/dto/airportInfo.interface';

@Injectable({
  providedIn: 'root',
})
export class AirportInfoService {

  constructor(private http: HttpClient) {}

  // Function to retrieve airport information based on IATA codes
  getAirportInfo(iataCodes: string[]): Observable<Airport[]> {
    const requests: Observable<any>[] = [];
    iataCodes.forEach((code) => {
      const url = `https://airport-info.p.rapidapi.com/airport?iata=${code}`;
      const headers: HttpHeaders = new HttpHeaders({
        'X-RapidAPI-Key': environment.rapidAPIKey,
        'X-RapidAPI-Host': environment.rapidAPIHost,
      });
      requests.push(this.http.get(url, { headers }));
    });
    // Combine multiple HTTP requests into a single observable stream
    return forkJoin(requests);
  }
}
