import type { Book } from '../../redux/interfaces';


function Card(book:Book) {

  return (
    <div className='card'>
      <h1>{book.name}</h1>
      <small>{book.isbn}</small>
      <h3>Autor: <strong>{book.authors}</strong></h3>
      <p>Publicado por: <strong>{book.publisher}</strong>
      <br/>
      Cantidad de Páginas: <strong>{book.numberOfPages}</strong>
      <br/>
      Material: <strong>{book.mediaType}</strong>
      <br/>
      Fecha de Publicación: <strong>{book.released}</strong>
      <br/>
      País: <strong>{book.country}</strong>

    
      </p>

      </div>
  )
}

export default Card