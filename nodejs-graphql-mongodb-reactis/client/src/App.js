import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
// components
import BookList from './components/BookList.js';
import './App.css';

// apllo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql?',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1> Hello! This is list books</h1>
        <BookList />
      </div>
    </ApolloProvider>
  );
}

export default App;
