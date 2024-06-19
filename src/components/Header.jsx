import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CookieContext } from '../context/cookieContext'
import Cookies from 'universal-cookie'

export const Header = () => {


  const cookies = new Cookies;
  const cookieValue = cookies.get("expense");
  // console.log(cookieValue);

  function deleteCookie(){
    cookies.remove("expense");
  }

  return (
    <div className='pl-4 h-12 flex items-center *:px-2 bg-gray-500  text-white font-mono text-xs'>
      <Link to='/' className='underline underline-offset-8  p-1 rounded-lg w-fit hover:text-red-600'>
            Home  
        </Link>
      {
        (!cookieValue)?
        <Link to='/login'>Login</Link>:
        <Link to='/login' className='underline underline-offset-8  p-1 rounded-lg w-fit hover:text-red-600' onClick={deleteCookie}>
            Log-Out  
        </Link>
      }
        
        
    </div>
  )
}
