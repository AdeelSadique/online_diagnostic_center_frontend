import React, { Suspense, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from './store';
import axios from 'axios';
import Loader from './Loader';

axios.defaults.baseURL = 'http://localhost:8000/fasttest/';
const token = localStorage.getItem('userToken');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
axios.defaults.headers['Accept'] = 'application/json';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>
);
