import React from 'react';

import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';
import './header.css';

interface HeaderProps {
  user?: String;
  onLogin: boolean;
}

export const Header = ({ user, onLogin }: HeaderProps) => (
  <header>
    <div className="header">
      <div>
        <Link to={'./'} ><img src="./logo200.png" alt="" /></Link>
        
        
      </div>
      <div>
        {user ? (
          <>
            <span className="welcome">
              Welcome, <b>{user}</b>!
            </span>
            <Button size="small" onClick={()=>alert('x')} label="Log out" />
          </>
        ) : (
          <>
            <Button size="small" label="Log in" />
            <Button primary size="small"  label="Sign up" />
          </>
        )}
      </div>
    </div>
  </header>
);
