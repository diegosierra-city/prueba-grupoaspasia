import { ActionTypes } from './actions';
import { AppState } from './interfaces';


const initialState: AppState = {
  // estado inicial
  listBooks: [],
  listAllBooks: [],
  book: null,
  listAuthors: [],
  filter: 'all',
  page: 1
};

export function appReducer(state = initialState, action:any) {
  switch(action.type) {
    case ActionTypes.ALL_BOOKS:
      return {
        ...state,
        listBooks: [...action.payload],
        listAllBooks: [...action.payload],
      };
      

    default: 
       return state;
  }
}