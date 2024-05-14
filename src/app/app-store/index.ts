import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { flightReducer } from './flights-store/reducers/flight.reducer';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
  flight: flightReducer,
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
