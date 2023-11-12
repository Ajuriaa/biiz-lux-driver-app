import { ICoordinate } from "src/app/core/interfaces";
import { IUserable } from ".";

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

export interface ITrip {
  passenger: IUserable;
  driver: IUserable;
  vehicle: IVehicle;
  startLocation: ICoordinate;
  endLocation: ICoordinate;
  startTime: string;
  fare: string;
}

export interface ITripInfo {
  startLocation: ICoordinate;
  endLocation: ICoordinate;
  startAddress: string;
  endAddress: string;
  startTime: string;
  distance: number;
  fare: string;
  status: string;
}
