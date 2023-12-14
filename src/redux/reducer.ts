import { ActionTypes } from './actions';
//import { AppState } from './interfaces';


interface AppState {
 data: string;
}

const initialState: AppState = {
  // estado inicial
  data: 'hola'
};

export function appReducer(state = initialState, action:any) {
  switch(action.type) {
    case ActionTypes.SET_DATA:
      // actualizar estado
      break;

    default: 
       return state;
  }
}