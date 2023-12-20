import axios from 'axios'
import { Book } from './interfaces';
import { getCookie } from '../utilities/cookie';

export enum ActionTypes {
 ALL_BOOKS = 'ALL_BOOKS',
 BOOK = 'BOOK',
 ADD_BOOK = 'ADD_BOOK',
 FAVORITE = 'FAVORITE',
}

export interface AllBooksAction {
 type: ActionTypes.ALL_BOOKS;
 payload: Book[];
}


export const allBooks = () => {
 return async (dispatch: any) => {
   try {
     const response = await axios.get('https://anapioficeandfire.com/api/books?page=1&pageSize=50');
     //console.log('lista completa API',response);
     //cargamos los favoritos
     let favorities: string[] = [];
     if(getCookie('favorities')) favorities = JSON.parse(getCookie('favorities'));
     //console.log('favorities',favorities);
     response.data.map((book: Book) => {
      favorities.includes(book.isbn)? book.favorite = true : book.favorite = false;
     } 
     );
     dispatch({
       type: ActionTypes.ALL_BOOKS,
       payload: response.data as Book[]
     });

   } catch (e) {
     console.log(e);
   }
 }
}
//
export interface BookAction {
  type: ActionTypes.BOOK;
  payload: Book;
 }
 export const getBook = (id:number) => {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(`https://anapioficeandfire.com/api/books/${id}`);
      console.log('Detalle',response.data);
      dispatch({
        type: ActionTypes.BOOK,
        payload: response.data as Book
      });
 
    } catch (e) {
      console.log(e);
    }
  }
 }
export const clearBook = () => {
  return {
    type: ActionTypes.BOOK,
    payload: {
      url: '',
   name: '',
   isbn: '',
   authors: [],
   numberOfPages: 0,
   publisher: '',
   country: '',
   mediaType: '',
   released: '',
   characters: [],
   povCharacters: [],
   favorite: false,
    }
  }
 }

 export interface AddBookAction {
  type: ActionTypes.ADD_BOOK;
  payload: Book;
 }
 export const addBook = (book:Book) => {
  console.log('enviando',book)
  /*
  return async (dispatch: any) => {
    try {
      const response = await axios.post(`https://anapioficeandfire.com/api/books/`,book);
      console.log('Detalle',response.data);
      dispatch({
        type: ActionTypes.ADD_BOOK,
        payload: response.data as Book
      });
 
    } catch (e) {
      console.log(e);
    }
  }
  */
 }

 export interface FavoriteAction {
  type: ActionTypes.FAVORITE;
  payload: Book;
 }
 export const getFavorites = () => {
  return {
      type: ActionTypes.FAVORITE,
      }
  }



export type AppActions = 
 | AllBooksAction;