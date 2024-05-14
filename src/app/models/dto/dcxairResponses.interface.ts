export interface DcxAirResponse {
    success?:boolean;
    message?:string;
    data?: Journey;
}

export interface Transport {
    flightCarrier: string;
    flightNumber: string;
}

export interface Flight {
    origin: string;
    destination: string;
    price: number;
    transport: Transport;
}

export interface Journey {
    origin: string;
    destination: string;
    price: number;
    flights: Flight[];
}
