import React, {useState, useEffect} from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { useGlobalContext } from '../context';
import { Link } from 'react-router-dom'

const IMG_API = "https://image.tmdb.org/t/p/original/";




const  Movie = ({title, poster_path, overview, vote_average, movieIndex, id}) => {
        const { movIndex, movies, setMovIndex } = useGlobalContext();


        let position = 'nextSlide';
          if (movieIndex === movIndex) {
            position = 'activeSlide';
          }
          if (
            movieIndex === movIndex - 1 ||
            (movIndex === 0 && movieIndex === movies.length - 1)
          ) {
            position = 'lastSlide';
          }

          return (
            <>
            <article className={position} key={id}>
                <Link to={`/movie/${id}`} >
              <img src={IMG_API + poster_path}  alt={title} className="person-img" />
              </Link>
              <h4>{title}</h4>
              
            </article>
          
        <button className="prev" onClick={() => setMovIndex(movIndex - 1)}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={() => setMovIndex(movIndex + 1)}>
          <FiChevronRight />
        </button>
        </>
          )
}
;

export default Movie