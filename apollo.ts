import { ApolloClient,InMemoryCache } from "@apollo/client";

const url = process.env.NEXT_STATIC_BACKEND_URL

export const client = new ApolloClient({
    uri:url,
    cache: new InMemoryCache
  })