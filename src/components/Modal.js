import React, {useState} from 'react';
import { useGlobalContext } from '../context';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom'

const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=1a4d53fc0dae9cee32537428a438e6c7&query=";
const IMG_API = "https://image.tmdb.org/t/p/original/";

const Modal =() => {
  
  const { isModalOpen, closeModal, movies, searchTerm, setMovies, setSearchTerm, getMovies, isActive, setIsActive } = useGlobalContext();


  async function getSearchMovies() {
    const moviesResp = await fetch(SEARCH_API + searchTerm);
    const moviesR = await moviesResp.json();
    const moviesFi = moviesR.results.filter(item => item.poster_path);
    const moviesFinal = moviesFi.sort((a, b) =>  b.popularity - a.popularity);
    setMovies(moviesFinal);
  }
  const handleOnSubmit = (e) => {
    e.preventDefault();
    setIsActive(true);
    
    getSearchMovies();
  }
  const handleOnChange = e => {
    setSearchTerm(e.target.value);
  }

  const handleOnClickClose = () => {
    closeModal();
    getMovies();
  }

  const handleOnClick = () => {
    closeModal();
    getMovies();
    setSearchTerm('');
    setIsActive(false);
  }

  const handleOnClickBtn = () => {
    closeModal();
    getSearchMovies();
    setSearchTerm('');
    setIsActive(false);
  }
  
  // console.log(movies);
  
  if(movies.length > 10){
    movies.length = 10;
  }

  return (
    <div
      className={`${
        isModalOpen ? 'modal-search-overlay show-modal' : 'modal-search-overlay'
      }`}
    >
      <div className='modal-container'>
        <header>
        <form onSubmit={handleOnSubmit}>
        <input 
        className="search" 
        type='search' 
        placeholder='Search movie...'
        value={searchTerm}
        onChange={handleOnChange} />
        </form>
      </header>
      <button className='close-modal-btn color-btn' onClick={handleOnClickClose}>
          <FaTimes></FaTimes>
        </button>
      <div className='search-container'>
        {movies.map((item, itemIndex) => {
          const {poster_path, title, id} = item;

          return <Link to={`/movie/${id}`} ><img src={IMG_API + poster_path} key={itemIndex} alt={title} className='search-result-movie' onClick={handleOnClick}></img>
          </Link>
        })}
        
      </div>
      <Link to={`/searchlist`} style={{ textDecoration: 'none' }}>
        <button className={isActive ? 'btn result-btn btn-visible' : 'btn result-btn'} onClick={handleOnClickBtn}>More results</button>
        </Link>
      </div>
    </div>
  );
}

export default Modal;