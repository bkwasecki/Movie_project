import React from "react";
import { useGlobalContext } from '../context';
import { Link } from 'react-router-dom';

const IMG_API = "https://image.tmdb.org/t/p/original/";
const cameraImg = 'https://images.pexels.com/photos/2335046/pexels-photo-2335046.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'

const SearchList = () => {
    const {movies} = useGlobalContext();
    


    return (
        <>
        <div className="people-container">
            {movies.map((item, itemIndex) => {
                const {title, id, poster_path, release_date, overview} = item;

                return <div className="person-container" key={itemIndex}>
                    <Link to={`/movie/${id}`} ><img src={ poster_path ? (IMG_API + poster_path) : (cameraImg)}  alt={title} className="person-photo"/></Link>
                    <div className="person-info">
                        <p className="category">name</p>
                        <p>{title}</p>
                        <p className="category">release date</p>
                        <p>{release_date}</p>
                        <p className="category">Genre</p>
                        <p className="searchlist-genres">{overview.substring(0,170).concat('...')}</p>
                        </div>
                    
                    </div>
            })}
        </div>
        </>
    )
}

export default SearchList;

{/* <p id="movies">
                        {known_for.map((movie, movieIndex) => {
                            const {backdrop_path, id} = movie;
                            return <Link to={`/movie/${id}`} > <img src={backdrop_path ?(IMG_API + backdrop_path) : (cameraImg)} alt={name} key={movieIndex} className="small-movie-poster"/> </Link>
                        })}
                        </p> */}

                        