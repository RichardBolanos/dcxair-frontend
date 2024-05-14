import { BehaviorSubject, Observable } from 'rxjs';
import { State } from './state'; // Importamos la interfaz de estado

export class Store {
  private state$: BehaviorSubject<State>;

  constructor(initialState: State) {
    this.state$ = new BehaviorSubject<State>(initialState);
  }

  setState(newState: Partial<State>): void {
    const currentState = this.state$.getValue();
    const updatedState = { ...currentState, ...newState };
    this.state$.next(updatedState);
  }

  selectState(): Observable<State> {
    return this.state$.asObservable();
  }
}
