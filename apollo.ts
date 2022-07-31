import { ApolloClient,InMemoryCache,HttpLink} from "@apollo/client";

const url = process.env.NEXT_STATIC_BACKEND_URL

export const graphqlClient = new ApolloClient({
    link:new HttpLink({
      uri:url
    }),
    cache: new InMemoryCache,
    ssrMode: typeof window === 'undefined'
  })