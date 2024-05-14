import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { DcxAirResponse } from '../models/dto/dcxairResponses.interface';
import { Airport } from '../models/dto/airportInfo.interface';

export interface State {
  dcxAirResponse?: DcxAirResponse,
  airports?: Airport[]
}

export const reducers: ActionReducerMap<State> = {
  dcxAirResponse: (state, action) => {
    return {...state};
  },
  airports: (state = [], action) => {
    return state;
  },
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
