import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DcxAirResponse } from '../models/dto/dcxairResponses.interface';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private initialState = {
    // Define tu estado inicial aquí
  };

  private stateSubject:BehaviorSubject<DcxAirResponse> = new BehaviorSubject<DcxAirResponse>(this.initialState);
  state$: Observable<any> = this.stateSubject.asObservable();

  constructor() {}
  getState(): BehaviorSubject<DcxAirResponse> {
    return this.stateSubject;
  }

  // Método para actualizar el estado
  setState(newState: any): void {
    this.stateSubject.next(newState);
  }
}
