import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import { useMutation } from "@vue/apollo-composable";

interface ITrip {
  passengerId: number;
  vehicleId: number;
  tripAttributes: ITripAttributes
}

interface ICoordinate {
  latitude: string
  longitude: string
}

type Status = 'active' | 'completed' | 'cancelled';

interface ITripAttributes {
  startLocation: ICoordinate;
  endLocation: ICoordinate;
  startTime: string;
  distance: number;
  fare: string;
  status: Status;
}

export const createTripMutation: DocumentNode = gql`
  mutation createTrip(
    $passengerId: Int!
    $vehicleId: Int!
    $tripAttributes: TripInput!
  ) {
    createTrip(
      passengerId: $passengerId
      vehicleId: $vehicleId
      tripAttributes: $tripAttributes
    ) {
      id
      passenger {
        user {
          id
        }
      }
    }
  }
`;

