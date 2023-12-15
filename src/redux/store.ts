import { applyMiddleware, compose, createStore } from 'redux';
import { appReducer } from './reducer';
import {thunk} from "redux-thunk";
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(appReducer,composeEnhancers(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;