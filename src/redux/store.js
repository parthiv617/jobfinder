import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './slices/jobsSlice';
import usersReducer from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    users: usersReducer,
  },
});

export default store;