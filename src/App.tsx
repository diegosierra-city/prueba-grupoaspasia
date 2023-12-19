import { useState } from 'react'
import {Routes, Route, useLocation} from 'react-router-dom';
import './App.css'

import Home from './pages/Home'
import AddBook from './pages/AddBook';
import { Header } from './stories/Header/Header';

function App() {
 

  return (
    <div className='App'>
      <Header
     user= {'Diego'}
     onLogin = {true} 
      />
     <Routes>
      <Route path='/' element={<Home/>}/>
<Route path='/addbook' element={<AddBook/>}/>
     </Routes>
    </div>
  )
}

export default App
