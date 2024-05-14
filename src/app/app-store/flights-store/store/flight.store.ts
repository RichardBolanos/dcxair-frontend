// flight.store.ts
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as FlightActions from '../actions/flight.actions';
import { FlightState } from '../state/flight.state';

@Injectable({
  providedIn: 'root'
})
export class FlightStore {
  state$: Observable<FlightState>;

  constructor(private store: Store<{ flight: FlightState }>) {
    this.state$ = this.store.select('flight');
  }

  getState(): Observable<FlightState> {
    return this.state$;
  }

  setState(newState: FlightState): void {
    this.store.dispatch(FlightActions.setFlightState({ newState }));
  }
}
