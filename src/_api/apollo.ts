import { ApolloClient, InMemoryCache } from "@apollo/client";
export const client = new ApolloClient({
    uri: process.env.URL,
    headers: {
        'Autorization': 'Bearer ' + process.env.TOKEN    
    },
    cache: new InMemoryCache()
})