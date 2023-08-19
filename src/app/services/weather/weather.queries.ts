import gql from "graphql-tag";
import { DocumentNode } from "graphql/language";

export const weatherQuery: DocumentNode = gql`
  query weatherQuery {
    weather {
      weather {
        icon
      }
    }
  }
`;


