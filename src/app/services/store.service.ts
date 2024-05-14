import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DcxAirResponse } from '../models/dto/dcxairResponses.interface';
import { State } from '../app-store';
import { Airport } from '../models/dto/airportInfo.interface';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private initialState: State = {
    dcxAirResponse: {},
    airports: [],
  };

  private stateSubject: BehaviorSubject<State> = new BehaviorSubject<State>(
    this.initialState
  );
  state$: Observable<State> = this.stateSubject.asObservable();

  constructor() {}
  getState(): BehaviorSubject<State> {
    return this.stateSubject;
  }
  

  setState(newState: State): void {
    this.stateSubject.next(newState);
  }

  setDcxairResponse(dcxAirResponse: DcxAirResponse) {
    this.stateSubject.next({ ...this.stateSubject.value, dcxAirResponse });
  }

  setAirports(airports: Airport[]) {
    this.stateSubject.next({ ...this.stateSubject.value, airports });
  }
}
