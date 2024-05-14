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
  // Declaration of class properties
  journey!: Journey; // Holds the journey information
  airports!: { [iata: string]: Airport }; // Holds airport information with IATA codes as keys

  // Constructor method to initialize the component with dependencies
  constructor(private storeService: StoreService) {
    // Subscribe to the state changes from the store service
    this.storeService.getState().subscribe((state: State) => {
      // If the DCX Air response data is available in the state, assign it to the 'journey' property
      if (state?.dcxAirResponse?.data) {
        this.journey = state.dcxAirResponse.data;
      }
      // If airport data is available in the state, transform it into an object with IATA codes as keys
      if (state?.airports) {
        this.airports = state.airports.reduce(
          (acc: { [iata: string]: Airport }, airport) => {
            acc[airport.iata] = airport;
            return acc;
          },
          {}
        );

        // Log the transformed airports object for debugging purposes
        console.log(this.airports);
      }
    });
  }

  // Function to get the address string based on street and streetNumber parameters
  getAddress(street: string, streetNumber: string): string {
    // Return 'N/A' if both street and streetNumber are empty strings
    return street == '' && streetNumber == ''
      ? 'N/A'
      // Otherwise, return the concatenated address with optional street number
      : street + (streetNumber != '' ? ' - ' + streetNumber : '');
  }

  // Function to get the postal code string, returns 'N/A' if postalCode is an empty string
  getPostalCode(postalCode: string): string {
    return postalCode == '' ? 'N/A' : postalCode;
  }

  // Function to get the phone number string, returns 'N/A' if phone number is an empty string
  getPhone(phone: string): string {
    return phone == '' ? 'N/A' : phone;
  }
}
