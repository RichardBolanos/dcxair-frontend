import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DcxAirResponse } from '../models/dto/dcxairResponses.interface';
import { State } from '../app-store';
import { Airport } from '../models/dto/airportInfo.interface';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  // Define the initial state of the store
  private initialState: State = {
    dcxAirResponse: {},
    airports: [],
  };

  // Create a subject to hold the state and make it observable
  private stateSubject: BehaviorSubject<State> = new BehaviorSubject<State>(
    this.initialState
  );
  state$: Observable<State> = this.stateSubject.asObservable();

  constructor() {}

  // Function to get the current state subject
  getState(): BehaviorSubject<State> {
    return this.stateSubject;
  }

  // Function to set a new state
  setState(newState: State): void {
    this.stateSubject.next(newState);
  }

  // Function to update the DCX Air response in the state
  setDcxairResponse(dcxAirResponse: DcxAirResponse) {
    this.stateSubject.next({ ...this.stateSubject.value, dcxAirResponse });
  }

  // Function to update the airports in the state
  setAirports(airports: Airport[]) {
    this.stateSubject.next({ ...this.stateSubject.value, airports });
  }
}
