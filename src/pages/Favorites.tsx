import BookTable from "../stories/BookTable/BookTable"
import { useSelector, useDispatch } from "react-redux"
import type { AppState, Book } from "../redux/interfaces"
import { useEffect } from "react";
import { getFavorites,allBooks } from "../redux/actions";

export default function Favorites() {
  const dispatch:any = useDispatch()
  const listFavorites: Book[] = useSelector((store: AppState) => store.favorites);

  async function init() {
    await dispatch(allBooks()); 
    dispatch(getFavorites());
  }

  useEffect(() => {
        init()
  },[])

 // console.log('DataFav:',listFavorites)
  return (
    <>
    <h1>Favoritos</h1>
    {listFavorites?.length>0 && (
     <BookTable listBook={listFavorites} /> 
    )}
    
    </>
  )
}
