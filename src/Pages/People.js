import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context';

const artistURL = 'https://api.themoviedb.org/3/person/popular?api_key=1a4d53fc0dae9cee32537428a438e6c7';
const IMG_API = "https://image.tmdb.org/t/p/original/";
const cameraImg = 'https://images.pexels.com/photos/2335046/pexels-photo-2335046.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
const flatCamera = 'https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'


const People = () => {
    const { artistList, getArtists } = useGlobalContext();



    return (
        <>
        <div className="people-container">
            {artistList.map((item, itemIndex) => {
                const {name, known_for_department, id, profile_path, known_for} = item;

                return <div className="person-container" key={itemIndex}>
                    <Link to={`/person/${id}`} ><img src={ profile_path ? (IMG_API + profile_path) : (cameraImg)}  alt={name} className="person-photo"/></Link>
                    <div className="person-info">
                        <p className="category">name</p>
                        <p>{name}</p>
                        <p className="category">category</p>
                        <p>{known_for_department}</p>
                        <p className="category">known for</p>
                        <p id="movies">
                        {known_for.map((movie, movieIndex) => {
                            const {backdrop_path, id} = movie;
                            return <Link to={`/movie/${id}`} > <img src={backdrop_path ?(IMG_API + backdrop_path) : (flatCamera)} alt={name} key={movieIndex} className="small-movie-poster"/> </Link>
                        })}
                        </p>
                        </div>
                    
                    </div>
            })}
        </div>
        
        </>
    )

}

export default People;