import { ApolloClient, createHttpLink, InMemoryCache, ApolloLink } from '@apollo/client/core'
import { onError } from "@apollo/client/link/error";
import { environment } from '../environments/environments';
import { useRouter } from "vue-router";

const http = createHttpLink({
    // You should use an absolute URL here
    uri: environment.apiUrl
})

const error = onError(({graphQLErrors, networkError}) => {
    if (!environment.production) {
        if (graphQLErrors) {
            console.error('graphqlErrors: ', graphQLErrors);
        }
        if (networkError) {
            console.error('networkErrors ', networkError);
        }
    }

    if (networkError && networkError.message.includes('401 Unauthorized')) {
        document.cookie = 'BZ-TOKEN=; path=/; expires=Wed, 01 Jan 2023 00:00:01 GMT;';
        document.cookie = 'BZ-ROLE=;path=/; expires=Wed, 01 Jan 2023 00:00:01 GMT;';
        useRouter().push('/');
    }
});


const cache = new InMemoryCache();

const link = ApolloLink.from([error, http as ApolloLink])

// Create the apollo client
export const apolloClient = new ApolloClient({
    link,
    cache,
    connectToDevTools: true
})