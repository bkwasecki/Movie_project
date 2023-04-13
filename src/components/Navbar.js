import React from 'react';
import { Link } from 'react-router-dom';
import logo_cropped from '../logo_cropped.svg';
import { useGlobalContext } from '../context';
import { FaBars } from 'react-icons/fa';

export default function Navbar() {

    const { openModal, getMovies, searchTerm } = useGlobalContext();
  

  return (
    <nav className='navbar'>
      
        <div className='nav-logo'>
            <Link to='/' onClick={getMovies}>
            <img src={logo_cropped} alt='logo'/>
            </Link>
            <button className='nav-toggle'>
            <FaBars />
          </button>
        </div>
        <div className='header'>
        <form  onClick={openModal}>
        <input 
        className="search" 
        type='search' 
        placeholder='Search movie...'
        value={searchTerm}
         />
        </form>
      </div>

        <ul className='nav-links'>
            <li>
              <Link to='categories'> Categories</Link> 
            </li>
            <li>
              <Link to='people'>  People</Link>
            </li>
           
        </ul>
      
    </nav>
  )
}