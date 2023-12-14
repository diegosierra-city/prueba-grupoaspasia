import { createStore } from 'redux';
import { appReducer } from './reducer';

export const store = createStore(appReducer);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;