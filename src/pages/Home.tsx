import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { allBooks } from "../redux/actions";
import type { AppState } from "../redux/interfaces";

function Home() {
 const dispatch:any = useDispatch();

 const listBooks = useSelector((store: AppState) => store.listBooks);
  const listAuthors = useSelector((store: AppState) => store.listAuthors);
  const filter = useSelector((store: AppState) => store.filter);

  useEffect(() => {
    dispatch(allBooks());
   //dispatch({ type: "FETCH_AUTHORS" });
  }
  , []);

  return (
    <div>Home
<h2>Listado de libros</h2>

      {listBooks?.map((book: any, i:number) => (
        <div key={i}>
          <h3>{book.name}</h3>
          <p>{book.country}</p>
        </div>
      ))}

    </div>
  )
}

export default Home