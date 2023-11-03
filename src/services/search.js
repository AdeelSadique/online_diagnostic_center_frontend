import { createReducer } from '@reduxjs/toolkit';
// const initialValue = { data: '' };
export const search = createReducer(
  { initialValue: '' },
  {
    search: (state, action) => {
      state.initialValue = action.payload;
    },
  }
);
