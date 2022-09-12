import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import useCachedResources from './hooks/useCachedResources';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { AppRegistry } from 'react-native';
import { expo } from './app.json';
import Navigation from './navigation';
import useColorScheme from './hooks/useColorScheme';

const appName = expo.name;
const ngrok = 'https://ab57-68-192-240-183.ngrok.io';
const link = createHttpLink({
  uri: `${ngrok}/graphql`,
  credentials: 'same-origin',
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await AsyncStorage.getItem('@auth_token');

  // return the headers to the context so httpLink can read them

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(link),
  // uri: '/graphql',
  cache: new InMemoryCache(),
});

//TODO handle global alert visibility

const App: any = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </Provider>
      </ApolloProvider>
    );
  }
};

export default App;

AppRegistry.registerComponent(appName.toLowerCase(), () => App);
