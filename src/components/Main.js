import React from 'react';
import Movie from './Movie';
import { useGlobalContext } from '../context';


export default function Main() {
    const {movies} = useGlobalContext();
    
    movies.length = 10;

  return (
    <>
      <div className='website-top'>
        <h1>Website dedicated to all the movie addicts</h1>
      </div>
      
      <section className='section'>
        
      <div className="section-center">
      {movies.map((movie, movieIndex) => (
        <Movie key={movie.id} movieIndex={movieIndex} {...movie}/>
      ))}  
    </div>
    </section>
      </>
  )
}