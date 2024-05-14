import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { State } from './state'; // Importamos la interfaz de estado

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private state$: BehaviorSubject<State>;

  constructor() {
    const initialState: State = {
        dcxAirResponse: null,
    };
    this.state$ = new BehaviorSubject<State>(initialState);
  }

  setState(newState: Partial<State>): void {
    const currentState = this.state$.getValue();
    const updatedState = { ...currentState, ...newState };
    this.state$.next(updatedState);
  }

  getState(): Observable<State> {
    return this.state$.asObservable();
  }
}
