import { Currency } from "../../../constants/currences.constant";
import { Airport } from "../../../models/dto/airportInfo.interface";
import { DcxAirResponse } from "../../../models/dto/dcxairResponses.interface";

export interface FlightState {
    selectedOrigin: Airport | null;
    selectedDestination: Airport | null;
    selectedBadge: string;
    airportsInfo: Airport[];
    filteredOriginOptions: Airport[];
    filteredDestinationOptions: Airport[];
    filteredCurrencyOptions: Currency[];
    journey: DcxAirResponse | null;
    loadingQuery: boolean;
  }