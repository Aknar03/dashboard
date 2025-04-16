import { configureStore } from '@reduxjs/toolkit';
import ticketFiltersReducer from './ticketFiltersSlice';

export const store = configureStore({
  reducer: {
    ticketFilters: ticketFiltersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
