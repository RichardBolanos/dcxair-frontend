import { Component, Input } from '@angular/core';
import {
  DcxAirResponse,
  Journey,
} from '../../models/dto/dcxairResponses.interface';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../services/store.service';
import { Airport } from '../../models/dto/airportInfo.interface';
import { State } from '../../app-store';
@Component({
  selector: 'app-flight-card',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MatIconModule, CommonModule],
  templateUrl: './flight-card.component.html',
  styleUrl: './flight-card.component.scss',
})
export class FlightCardComponent {
  journey!: Journey;
  airports!: Airport[];
  constructor(private storeService: StoreService) {
    this.storeService.getState().subscribe((state: State) => {
      if (state?.dcxAirResponse?.data) {
        this.journey = state.dcxAirResponse.data;
      }
      if (state?.airports) {
        this.airports = state.airports;
        console.log(this.airports);
      }
    });
  }
}
