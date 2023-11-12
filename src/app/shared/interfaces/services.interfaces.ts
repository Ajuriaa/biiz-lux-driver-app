import { ICoordinate } from "src/app/core/interfaces";
import { IUser } from "src/app/interfaces";

export interface IWeatherInfo {
  icon: string;
}

export interface IWeatherResponse {
  weather: IWeatherInfo[];
  main: {
    temp: number;
  }
}

export interface IHomeResponse {
  weather: IWeatherResponse;
}

export interface IProfileHeaderResponse {
  currentUser: IUser;
}

export interface IVehicle {
  id: string;
  vehicle_type: string;
  model: string;
  plate: string;
  year: number;
  color: string;
  registration: string;
  registration_expiration_date: string;
}

export interface IAddress {
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  primary: boolean;
}


export interface IUserable {
  addresses?: IAddress[];
  vehicles?: IVehicle[];
  user?: IUser;
}


export interface ITrip {
  passenger: IUserable;
  driver: IUserable;
  vehicle: IVehicle;
  startLocation: ICoordinate;
  endLocation: ICoordinate;
  startAddress: string;
  endAddress: string;
  startTime: string;
  fare: string;
}
