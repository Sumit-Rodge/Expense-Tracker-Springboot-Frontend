import React, { useState } from 'react'
import { Login } from './login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Register } from './Register';
import { Home } from './Home';
import { Header } from './Header';
import { CookieContext } from '../context/cookieContext';

export const Index = () => {
const [encryptedCookieValue,setEncryptedCookieValue]= useState(document.cookie.split('=')[1]);

  return (
    <BrowserRouter>
    <CookieContext.Provider value={[encryptedCookieValue,setEncryptedCookieValue]}>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/register'element={<Register/>} />
      </Routes>
    </CookieContext.Provider>
    </BrowserRouter>
  )
}
