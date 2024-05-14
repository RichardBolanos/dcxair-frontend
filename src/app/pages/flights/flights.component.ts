import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { AirportInfoService } from '../../services/airport-info.service';
import { Airport } from '../../models/dto/airportInfo.interface';
import { DcxairService } from '../../services/dcxair.service';
import { DcxAirResponse } from '../../models/dto/dcxairResponses.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable, startWith, map } from 'rxjs';
import { DcxairFlightsRequest } from '../../models/dto/dcxairRequest.interface';
import { FlightCardComponent } from '../../components/flight-card/flight-card.component';
import { Currency, currencies } from '../../constants/currences.constant';
import { StoreService } from '../../services/store.service';
import { State } from '../../app-store';

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatButtonToggleModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    FlightCardComponent,
  ],
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.scss',
})
export class FlightsComponent implements OnInit {
  selectedOrigin!: Airport;
  selectedDestination!: Airport;
  selectedBadge: string = '';
  airportsInfo!: Airport[]; // Holds the airport information
  flightForm: FormGroup; // Form group for flight form
  filteredOriginOptions!: Observable<Airport[]>; // Observable for filtered origin airport options
  filteredDestinationOptions!: Observable<Airport[]>; // Observable for filtered destination airport options
  filteredCurrencyOptions!: Observable<Currency[]>; // Observable for filtered currency options
  journey: DcxAirResponse = {}; // Holds the journey information
  loadingQuery: boolean = true; // Flag to indicate if the query is loading
  mainCurrencies = currencies; // Holds the main currencies
  state!: State; // Holds the state information

  constructor(
    private fb: FormBuilder,
    private airportService: AirportInfoService,
    private dcxairService: DcxairService,
    private _snackBar: MatSnackBar,
    private storeService: StoreService
  ) {
    // Initialize the flight form with form controls and validators
    this.flightForm = this.fb.group({
      origin: ['', Validators.required], // Origin airport control
      destination: ['', Validators.required], // Destination airport control
      currency: ['', Validators.required], // Currency control
      oneWay: ['', Validators.required], // One-way control
    });

    // Initialize the store service state
    this.storeService.setState({});

    // Subscribe to the state changes from the store service
    this.storeService.getState().subscribe((state: State) => {
      // If the DCX Air response data is available in the state, assign it to the 'journey' property
      if (state?.dcxAirResponse) {
        this.journey = state.dcxAirResponse;
      }
    });
  }

  ngOnInit() {
    // Initialize component data
    this.initData();
    // Initialize filtered options for origin and destination airports
    this.filteredOriginOptions = this.initFiltersAirport('origin');
    this.filteredDestinationOptions = this.initFiltersAirport('destination');
    // Initialize filtered options for currency
    this.filteredCurrencyOptions = this.initFiltersCurrency('currency');
  }

  // Initializes filtered options for currency based on user input
  private initFiltersCurrency(formControlName: string): Observable<Currency[]> {
    return this.getFormControl(formControlName).valueChanges.pipe(
      startWith(''),
      map((value) => this._filterCurrency(value || '', true))
    );
  }

  // Initializes filtered options for airports based on user input
  private initFiltersAirport(formControlName: string): Observable<Airport[]> {
    return this.getFormControl(formControlName).valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '', true))
    );
  }

  // Filters airports based on user input
  private _filter(value: any, isDestination: boolean): Airport[] {
    let filterValue: any;
    try {
      filterValue = (value as string).normalize().toLowerCase();
    } catch (_) {
      filterValue = (value.name as string).normalize().toLowerCase();
    }
    return this.airportsInfo?.filter((option) => {
      return filterValue == ''
        ? false
        : (option.location as string)
            .normalize()
            .toLowerCase()
            .includes(filterValue);
    });
  }

  // Filters currencies based on user input
  private _filterCurrency(value: any, isDestination: boolean): Currency[] {
    let filterValue: any;
    try {
      filterValue = (value as string).normalize().toLowerCase();
    } catch (_) {
      filterValue = (value.name as string).normalize().toLowerCase();
    }
    return this.mainCurrencies?.filter((option) => {
      return filterValue == ''
        ? false
        : (option.name as string)
            .normalize()
            .toLowerCase()
            .includes(filterValue);
    });
  }

  // Initializes component data by retrieving airport information
  private initData(): void {
    this.dcxairService.getCountries().subscribe({
      next: (res: any) => {
        if (res.data) {
          this.getAirportInfo(res.data as string[]);
        } else {
          console.log(res.message);
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  // Retrieves airport information based on IDs
  private getAirportInfo(airportIds: string[]): void {
    this.airportService.getAirportInfo(airportIds).subscribe({
      next: (res: Airport[]) => {
        this.airportsInfo = res;
        this.storeService.setAirports(this.airportsInfo);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  // Submits flight form
  onSubmit() {
    if (this.flightForm.valid) {
      const formValues = this.flightForm.value;
      const request: DcxairFlightsRequest = {
        origin: formValues.origin.iata,
        destination: formValues.destination.iata,
        currency: formValues.currency.code,
        oneWay: formValues.oneWay,
      };
      this.dcxairService.getFlights(request).subscribe({
        next: (data: DcxAirResponse) => {
          this.storeService.setDcxairResponse(data);
        },
        error: (err) => {
          this.openSnackBar('' + err?.error?.message, 'Ok');
        },
        complete: () => {
          
        },
      });
    } else {
      this.openSnackBar('Please fill in required fields', 'Ok');
    }
  }

  // Display function for airport autocomplete
  displayFn(airport: any): string {
    return airport ? airport.location : '';
  }

  // Display function for currency autocomplete
  displayFnCurrency(currency: Currency): string {
    return currency ? currency.name : '';
  }

  // Retrieves form control by name
  getFormControl(formControlName: string): FormControl {
    return this.flightForm.get(formControlName) as FormControl;
  }

  // Opens a snack bar with a message
  openSnackBar(message: string, actionMessage: string) {
    this._snackBar.open(message, actionMessage, {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration: 2000,
    });
  }
}
