import { createStore, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import accountsReducers from './reducers/accounts.reducers';
import profilesReducers from './reducers/profiles.reducers';
import alertsReducers from './reducers/alerts.reducers';

export const store = configureStore({
  reducer: {
    accounts: accountsReducers,
    profiles: profilesReducers,
    alerts: alertsReducers,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;