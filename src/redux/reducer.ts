import { ActionTypes } from './actions';
import { AppState } from './interfaces';


const initialState: AppState = {
  // estado inicial
  listBooks: [],
  listAllBooks: [],
  book: null,
  listAuthors: [],
  filter: 'all',
};

export function appReducer(state = initialState, action:any) {
  switch(action.type) {
    case ActionTypes.ALL_BOOKS:
      console.log('lista completa',action.payload);
      return {
        ...state,
        listBooks: [...action.payload],
        listAllBooks: [...action.payload],
      };
      

    default: 
       return state;
  }
}