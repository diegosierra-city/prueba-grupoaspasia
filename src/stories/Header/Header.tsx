

import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';
import './header.css';


interface HeaderProps {
  user?: String;
  location: String;
}


export const Header = ({ user, location }: HeaderProps) => (
  <header>
    <div className="header">
      <div>
        <Link to={'/'} ><img src="/logo200.png" alt="" /></Link>
             
      </div>
      <div>
        {location == '/addbook' && user && (
          <>
            <span className="welcome mr-4">
              Bienvenido, <b>{user}</b>!
            </span>
            
          </>
        )}
          <>
<Link to={'/favorites'} >
          <Button primary size="small" label="Favoritos" />
        </Link> 
<Link to={'/addbook'} >
          <Button primary size="small" label="Agregar Libro" />
        </Link>         
           
          </>
        
      </div>
    </div>
  </header>
);
