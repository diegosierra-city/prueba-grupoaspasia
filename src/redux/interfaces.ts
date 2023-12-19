export interface Book { 
 url: string;
   name: string;
   isbn: string;
   authors: string[];
   numberOfPages: number;
   publisher: string;
   country: string;
   mediaType: string;
   released: string;
   characters: string[];
   povCharacters: string[];
 }
 
 export interface AppState {
   listBooks: Book[];
   listAllBooks: Book[];
   book: Book | null;
   listAuthors: string[];
   filter: string;
   page: number;
 }