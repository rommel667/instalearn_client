import React, { createContext, useReducer } from 'react';
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { ApolloProvider } from '@apollo/react-hooks'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import Layout from './Layout'
import { setContext } from 'apollo-link-context'
import { split } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store'
import Moment from 'react-moment';
import 'moment-timezone';
import { extraReducer, initialState } from './redux/reducers/extraReducer'

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_HTTP_API_DEV,
})

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_WS_API_DEV,
  options: {
    reconnect: true
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);



const authorizationLink = setContext(() => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authorizationLink.concat(splitLink),
  cache: new InMemoryCache()
})

export const ExtraContext = createContext()



const App = () => {

  const [ state, extraDispatch ] = useReducer(extraReducer, initialState)

  return (

    <ApolloProvider client={client}>
     <Provider store={store}>
     <PersistGate persistor={persistor}>
     <ExtraContext.Provider value={{state, extraDispatch}}>
      <Router>
        <Layout />
      </Router>
      </ExtraContext.Provider>
      </PersistGate>
      </Provider>
    </ApolloProvider>

  );
}

export default App;
