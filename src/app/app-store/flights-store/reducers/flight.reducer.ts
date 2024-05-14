import { Action, createReducer, on } from '@ngrx/store';
import * as FlightActions from '../actions/flight.actions';
import { FlightState } from '../state/flight.state';

export const initialState: FlightState = {
  airportsInfo: [],
  filteredCurrencyOptions: [],
  filteredDestinationOptions: [],
  filteredOriginOptions: [],
  journey: null,
  loadingQuery: false,
  selectedBadge: '',
  selectedDestination: null,
  selectedOrigin: null,
};

const _flightReducer = createReducer(
  initialState,
  on(FlightActions.setFlightState, (state, { newState }) => ({
    ...state,
    ...newState,
  }))
);

export function flightReducer(state: FlightState | undefined, action: Action) {
  return _flightReducer(state, action);
}
