import '../styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import {graphqlClient}from '../apollo'
import { Provider } from 'react-redux'
import store from '../store'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {

  return <>
  <ApolloProvider client={graphqlClient}>
    <Provider store={store}>
    <Component {...pageProps} />
    </Provider>
  </ApolloProvider>
  </>
}

export default MyApp
