import { Component, Input } from '@angular/core';
import { Journey } from '../../models/dto/dcxairResponses.interface';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-flight-card',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MatIconModule, CommonModule],
  templateUrl: './flight-card.component.html',
  styleUrl: './flight-card.component.scss',
})
export class FlightCardComponent {
  @Input() journey!: Journey;
}
