import { ICoordinate } from "./coords.interface";

export type Status = 'active' | 'completed' | 'cancelled';

export interface ITrip {
  passengerId: number;
  vehicleId: number;
  tripAttributes: ITripAttributes
}

export interface ITripAttributes {
  startLocation: ICoordinate;
  endLocation: ICoordinate;
  startTime: string;
  distance: number;
  fare: string;
  status: Status;
}
