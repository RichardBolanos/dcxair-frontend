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
    FlightCardComponent
  ],
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.scss',
})
export class FlightsComponent implements OnInit {
  mainCurrencies: { code: string; name: string }[] = [
    { code: 'USD', name: 'Dólar estadounidense' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'Libra esterlina' },
    { code: 'JPY', name: 'Yen japonés' },
    { code: 'CAD', name: 'Dólar canadiense' },
    // Añade más monedas según sea necesario
  ];
  selectedOrigin!: Airport;
  selectedDestination!: Airport;
  selectedBadge: string = '';
  airportsInfo!: Airport[];
  flightForm: FormGroup;
  filteredOriginOptions!: Observable<Airport[]>;
  filteredDestinationOptions!: Observable<Airport[]>;
  journey:DcxAirResponse = {};
  loadingQuery: boolean = true;

  constructor(
    private fb: FormBuilder,
    private airportService: AirportInfoService,
    private dcxairService: DcxairService,
    private _snackBar: MatSnackBar
  ) {
    this.flightForm = this.fb.group({
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      currency: ['', Validators.required],
      oneWay: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.initData();

    this.filteredOriginOptions = this.getFormControl(
      'origin'
    ).valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '', false))
    );
    this.filteredDestinationOptions = this.getFormControl(
      'destination'
    ).valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '', true))
    );
  }

  private _filter(value: any, isDestination: boolean): Airport[] {
    let filterValue: any;

    try {
      filterValue = value.toLowerCase();
    } catch (_) {
      filterValue = value.location.toLowerCase();
    }
    return this.airportsInfo?.filter((option) => {
      if (isDestination) {
      }
      return filterValue == ''
        ? false
        : option.location.toLowerCase().includes(filterValue);
    });
  }

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

  private getAirportInfo(airportIds: string[]): void {
    this.airportService.getAirportInfo(airportIds).subscribe({
      next: (res: Airport[]) => {
        this.airportsInfo = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onSubmit() {
    if (this.flightForm.valid) {
      //this.loadingQuery = true;
      const formValues = this.flightForm.value;
      const request: DcxairFlightsRequest = {
        origin: formValues.origin.iata,
        destination: formValues.destination.iata,
        currency: formValues.currency.code,
        oneWay: formValues.oneWay,
      };
      this.dcxairService.getFlights(request).subscribe({
        next: (data: DcxAirResponse) => {
          this.journey = data;
        },
        error: (err: DcxAirResponse) => {
          this.openSnackBar('Ha ocurrido un error', 'Ok');
        },
        complete: () => {
          //this.loadingQuery = false;
        },
      });
    } else {
      this.openSnackBar('Por favor llene los campos obligatorios', 'Ok');
    }
  }

  displayFn(airport: any): string {
    return airport ? airport.location : '';
  }

  getFormControl(formControlName: string): FormControl {
    return this.flightForm.get(formControlName) as FormControl;
  }
  openSnackBar(message: string, actionMessage: string) {
    this._snackBar.open(message, actionMessage, {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration: 500,
    });
  }
}
