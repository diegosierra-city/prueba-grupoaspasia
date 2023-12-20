import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addBook } from '../redux/actions'; 
import type { Book } from '../redux/interfaces';
import { Button } from '../stories/Button/Button';

// Definir el esquema de validación con Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required('*El nombre del libro es requerido'),
  isbn: Yup.string().required('*ISBN requerido'),
  //authors: Yup.string().required('* Array de Autores requerido'),
  authors: Yup.array().required('*Autor requerido').min(1),
  //authors: Yup.array().of(Yup.string().required('*El nombre del autor es requerido')),  
  numberOfPages: Yup.number().required('*Número de páginas requerido').positive(),
  publisher: Yup.string().required('*Publicado por requerido'),
  country: Yup.string().required('*País requerido'),
  mediaType: Yup.string().required('*Material requerido'),
  released: Yup.date().required('*Fecha de publicación requerido'),
  
});

// Componente de formulario
const AddBook: React.FC = () => {
  const dispatch:any = useDispatch();

  const initialValues: Book = {
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
  };

  const handleSubmit = (values: Book) => {
     dispatch(addBook(values));
  };

  return (
    <>
    <h1 className='mb-4'>Agregar Libro</h1>

    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >      
      <Form className='formulario'>
        <div>
          <label htmlFor="name">Nombre del libro:</label>
          <Field type="text" id="name" name="name" />
          <ErrorMessage name="name" component="span" />
        </div>

        <div>
          <label htmlFor="authors[0]">Autores:</label>
                 
          <Field name="authors[0]" />
          <Field name="authors[1]" />
          <ErrorMessage name="authors" component="span" />
        </div>

        <div>
          <label htmlFor="isbn">isbn:</label>
          <Field type="text" id="isbn" name="isbn" />
          <ErrorMessage name="isbn" component="span" />
        </div>

        <div>
          <label htmlFor="numberOfPages">Número de Páginas:</label>
          <Field type="number" id="numberOfPages" name="numberOfPages" />
          <ErrorMessage name="numberOfPages" component="span" />
        </div>

        <div>
          <label htmlFor="publisher">Publicado por:</label>
          <Field type="text" id="publisher" name="publisher" />
          <ErrorMessage name="publisher" component="span" />
        </div>

        <div>
          <label htmlFor="country">País:</label>
          <Field type="text" id="country" name="country" />
          <ErrorMessage name="country" component="span" />
        </div>

        <div>
          <label htmlFor="mediaType">Material:</label>
          <Field type="text" id="mediaType" name="mediaType" />
          <ErrorMessage name="mediaType" component="span" />
        </div>

        <div>
          <label htmlFor="released">Fecha Publicación:</label>
          <Field type="date" id="released" name="released" />
          <ErrorMessage name="released" component="span" />
        </div>
        

        <div>
        <Button primary size="medium" type="submit" label="Registrar Libro" />
          
        </div>
      </Form>
    </Formik>
    </>
    
  );
};

export default AddBook;