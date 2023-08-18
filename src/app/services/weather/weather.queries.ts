import gql from "graphql-tag";

export const weatherQuery: DocumentNode = gql`
    query weatherQuery {
        weather {
            weather {
                icon
            }
        }
    }
`;


