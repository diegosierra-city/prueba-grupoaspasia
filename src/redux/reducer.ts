import { ActionTypes } from './actions';
import type { AppState,Book } from './interfaces';


const initialState: AppState = {
  // estado inicial
  listBooks: [],
  listAllBooks: [],
  book: null,
  favorites: []
};

export function appReducer(state = initialState, action:any) {
  switch(action.type) {
    case ActionTypes.ALL_BOOKS:
      return {
        ...state,
        listBooks: [...action.payload],
        listAllBooks: [...action.payload],
      };
      
case ActionTypes.BOOK:
      return {
        ...state,
        book: {...action.payload}
      };

case ActionTypes.FAVORITE:
  const favBooks: Book[] = state.listAllBooks.filter((book:Book) => book.favorite)
  console.log('todos',state.listBooks)
      return {
        ...state,
        favorites: [...favBooks]
      };

    default: 
       return state;
  }
}