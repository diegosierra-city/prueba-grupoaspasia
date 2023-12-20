import BookTable from "../stories/BookTable/BookTable"
import { useSelector, useDispatch } from "react-redux"
import type { AppState, Book } from "../redux/interfaces"
import { useEffect } from "react";
import { allBooks } from "../redux/actions";




export default function Home() {
  
  const dispatch:any = useDispatch();
  const listBooks: Book[] = useSelector((store: AppState) => store.listBooks);
  
 useEffect(() => {
 dispatch(allBooks());  
  }, [])


  return (
    <>
    <h1>Nuestros Títulos</h1>
    {listBooks?.length>0 && (
     <BookTable listBook={listBooks} /> 
    )}
    
    </>
  )
}
