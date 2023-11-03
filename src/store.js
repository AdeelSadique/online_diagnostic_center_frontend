import { configureStore } from '@reduxjs/toolkit';
import { search } from './services/search.js';
import { isLogged } from './services/isLogged.js';

const store = configureStore({
  reducer: {
    search: search,
    isLogged: isLogged,
  },
});

export default store;
