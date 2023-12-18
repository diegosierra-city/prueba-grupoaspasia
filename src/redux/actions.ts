import axios from 'axios'
import { AppState, Book } from './interfaces';

export enum ActionTypes {
 ALL_BOOKS = 'ALL_BOOKS',
 BOOK = 'BOOK',
 FILTER = 'FILTER',
 ORDER = 'ORDER',
 PAGE = 'PAGE',
 ADD_BOOK = 'ADD_BOOK',
 AUTHORS = 'AUTHORS'
}

export interface AllBooksAction {
 type: ActionTypes.ALL_BOOKS;
 payload: Book[]; 
}
export const allBooks = () => {
 return async (dispatch: any) => {
   try {
     const res = await axios.get('https://anapioficeandfire.com/api/books?page=1&pageSize=10');

     dispatch({
       type: ActionTypes.ALL_BOOKS,
       payload: res.data
     });

   } catch (e) {
     console.log(e);
   }
 }
}


export type AppActions = 
 | AllBooksAction;