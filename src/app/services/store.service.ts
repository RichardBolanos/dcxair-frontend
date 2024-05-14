import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private initialState = {
    // Define tu estado inicial aquí
  };

  private stateSubject = new BehaviorSubject<any>(this.initialState);
  state$: Observable<any> = this.stateSubject.asObservable();

  constructor() { }
  getState(): any {
    return this.stateSubject.value;
  }

  // Método para actualizar el estado
  setState(newState: any): void {
    this.stateSubject.next(newState);
  }
}
