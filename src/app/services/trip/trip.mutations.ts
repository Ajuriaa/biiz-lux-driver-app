import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

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

