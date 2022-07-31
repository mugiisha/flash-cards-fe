import { ApolloClient,InMemoryCache,HttpLink} from "@apollo/client";

const url = 'https://flash-cards-be.herokuapp.com/'

export const graphqlClient = new ApolloClient({
    link:new HttpLink({
      uri:url
    }),
    cache: new InMemoryCache,
    ssrMode: typeof window === 'undefined'
  })