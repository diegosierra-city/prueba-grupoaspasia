import { useState } from 'react'
import {Routes, Route, useLocation} from 'react-router-dom';
import './App.css'

import Home from './pages/Home'
import AddBook from './pages/AddBook';
import Detail from './pages/Detail';
import Favorites from './pages/Favorites';
import { Header } from './stories/Header/Header';


function App() {
 

  return (
    <div className='App'>
      <Header
     user= {'Diego'}
     onLogin = {true} 
      />
      <section className='container'>
<Routes>
      <Route path='/' element={<Home/>}/>
<Route path='/addbook' element={<AddBook/>}/>
<Route path='/detail/:id' element={<Detail/>}/>
<Route path='/favorites' element={<Favorites/>}/>
     </Routes>
      </section>
     
    </div>
  )
}

export default App
