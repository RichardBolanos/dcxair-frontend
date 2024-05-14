import { createAction, props } from '@ngrx/store';
import { FlightState } from '../state/flight.state';


export const setFlightState = createAction('[Flight] Set State', props<{ newState: FlightState }>());