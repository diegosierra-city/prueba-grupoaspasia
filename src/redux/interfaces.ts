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
   favorite: boolean;
 }
 
 export interface AppState {
   listBooks: Book[];
   listAllBooks: Book[];
   book: Book | null;
   favorites: Book[];
 }
 
 export interface ColumnBook {
  accessorKey: string
  header: string,
  cell: any | null,
  footer: any | null,
 } 
 
