import { createReducer } from '@reduxjs/toolkit';
const initialValue = { isLogged: 0, data: [] };
export const isLogged = createReducer(initialValue, {
  isLogged: (state, action) => {
    state.isLogged = 1;
    state.data = action.payload;
  },
  logout: (state) => {
    state.isLogged = 0;
    state.data = '';
  },
});
