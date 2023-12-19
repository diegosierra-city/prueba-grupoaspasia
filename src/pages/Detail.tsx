import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { getBook,clearBook } from "../redux/actions";
import { useEffect } from "react";
import Card from "../stories/Card/Card";
import type { Book } from "../redux/interfaces";

function Detail() {
  const {id}=useParams()
  const bookDetail:Book = useSelector((state:any)=>state.book)
 const dispatch:any = useDispatch()

 useEffect(()=>{
  dispatch(getBook(Number(id)))
  /// limpio state.book al salir
  return ()=>{
    dispatch(clearBook()) 
  }
 },[id])


  return (
    <>
     <Card
     {...bookDetail} 
     /> 
      </>
  )
}

export default Detail