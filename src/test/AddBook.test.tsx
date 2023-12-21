import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import AddBook from '../pages/AddBook';

describe('<AddBook />', () => {
  it('should render the form', () => { 
    const { getByLabelText } = render(<AddBook />);
    
    expect(getByLabelText('Nombre del libro:')).toBeInTheDocument();
    expect(getByLabelText('Autores:')).toBeInTheDocument();
    expect(getByLabelText('isbn:')).toBeInTheDocument();
    expect(getByLabelText('Número de Páginas:')).toBeInTheDocument();
expect(getByLabelText('Publicado por:')).toBeInTheDocument();
expect(getByLabelText('País:')).toBeInTheDocument();    
expect(getByLabelText('Material:')).toBeInTheDocument();
expect(getByLabelText('Fecha Publicación:')).toBeInTheDocument();
   
  });

  it('debe mostrar errores de validación para los campos obligatorios al enviar un formulario vacío', async () => {
    const { getByText } = render(<AddBook />);
    
    fireEvent.click(getByText('Registrar Libro'));
    
    expect(getByText('*El nombre del libro es requerido')).toBeVisible();
    expect(getByText('*Autor requerido')).toBeVisible();
    expect(getByText('*ISBN requerido')).toBeVisible();
    expect(getByText('*Número de páginas requerido')).toBeVisible();
    expect(getByText('*Publicado por requerido')).toBeVisible();
    expect(getByText('*País requerido')).toBeVisible();
    expect(getByText('*Material requerido')).toBeVisible();
    expect(getByText('*Fecha de publicación requerido')).toBeVisible();
    //
  });

  it('debe llamar a dispatch con los datos del libro al enviar un formulario válido', async () => {
     const dispatch:any = jest.fn();
     const { getByLabelText, getByText } = render(<AddBook {...dispatch}/>);
     
     fireEvent.change(getByLabelText('Nombre del libro:'), {target: {value: 'My Book'}});
     fireEvent.change(getByLabelText('isbn:'), {target: {value: '123456789'}});
     fireEvent.change(getByLabelText('Autores:'), {target: {value: 'García Marquez'}});
     fireEvent.change(getByLabelText('Número de Páginas:'), {target: {value: '2430'}});
     fireEvent.change(getByLabelText('Publicado por:'), {target: {value: 'Planeta'}});
     fireEvent.change(getByLabelText('País:'), {target: {value: 'Colombia'}});
     fireEvent.change(getByLabelText('Material:'), {target: {value: 'Cuero'}});
     fireEvent.change(getByLabelText('Fecha Publicación:'), {target: {value: '2023-06-01'}});
     // 
     
     fireEvent.click(getByText('Registrar Libro'));
     
     expect(dispatch).toHaveBeenCalledWith(
       expect.objectContaining({
         name: 'My Book',
         isbn: '123456789',
         authors: ['García Marquez'],
         numberOfPages: 2430,
         publisher: 'Planeta',
         country: 'Colombia',
         mediaType: 'Cuero',
         released: '2023-06-01',
         characters: [],
   povCharacters: []

       })
     );
  }); 
});