import React, {useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import {AiFillStar} from 'react-icons/ai';
import { useGlobalContext } from '../context';


const IMG_API = "https://image.tmdb.org/t/p/original/";

const MovieDetails = ()=> {
    const {id} = useParams();

    const {getArtists, cast, setCast, movie, setMovie } = useGlobalContext();

    useEffect(() => {
    async function getMovieDetails() {
        try {
        let [details, cast] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=1a4d53fc0dae9cee32537428a438e6c7`).then(data => data.json()),
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=1a4d53fc0dae9cee32537428a438e6c7`).then(data => data.json())]);
        // const data = await response.json();
        console.log(details, cast);
        if(details) {
        const {title, backdrop_path, release_date, runtime, vote_average, poster_path, overview, genres, production_countries} = details;
        const newMovie = {title, backdrop_path, release_date, runtime, vote_average, poster_path, overview, genres, production_countries};
        const castList = cast.cast.filter(item => item.profile_path);
        castList.length = 5;
        setMovie(newMovie);
        setCast(castList);
        }else{
            setMovie(null);
            setCast([]);
        }
        } catch (error) {
            console.log(error);
        }
    }
    getMovieDetails();
    }, [id]);

    function toHoursAndMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return { hours, minutes };
    }

    if(!movie){
        return <h2>there is no movie to display</h2>
    } else {

    
    const {title, backdrop_path,release_date, runtime, vote_average, poster_path, overview, genres, production_countries} = movie;
    // const genresArr = genres.map(item => item.name);
    // console.log(genres);
    const production = production_countries.map(item => item.name);
    const time = toHoursAndMinutes(runtime);
    const {hours, minutes} = time;
    const year = release_date.substring(0,4);
    const rating = vote_average.toFixed(1);
    
    const removeTruncate = (e) => {
        e.target.classList.toggle('truncate-movie');
    }

    console.log(cast);

    return (
        <>
        <div className="details-page-container" style={{
            backgroundImage: `linear-gradient(rgba(0,0,0, 0) 0%,rgba(0,0,0, 1) 100%), url(${IMG_API}${backdrop_path})`
        }}>
            <div className="details-page-main">
                <h1>{title}</h1>
                <span className="info-span">{year}</span><span className="info-span"> {hours}h {minutes}m</span>
                
                <p className="rating-para"><span className="rating-span-icon"><AiFillStar style={{color: 'yellow'}}/></span><span className="rating-span">{rating}</span></p>
            </div>
            
        </div>
        <div className="section-middle">
            <img src={IMG_API+poster_path} alt="" className="main-poster"/>
            <div className="movie-datiles-container">
                <p className="overview truncate-movie" onClick={removeTruncate}>{overview}</p>
            
            <div className="section-middle-details">
                    <p className="category" id="gen1">Genre </p><p id="val1">
                    { genres.length !== 0 ? genres.map((item, index) => {
                return  <Link to={`/category/${item.id}`} style={{ textDecoration: 'none' }} > <span className="span-border" key={index} > {item.name} </span> </Link>
                
              }) : 'Unknown'}
              </p>
              <p className="category" id="gen2">Release Date </p><p id="val2" className="span-border year-border">{release_date}</p>
              <p className="category" id="gen3">Production </p><p id="val3">
                    {production.map((item, index) => {
                        return <span className="span-border" key={index} > {item} </span>
                    })}
              </p>
            </div>
            
            </div>
            
        </div>
        <div className="cast-details">
                {cast.map((item, itemIndex) => {
                    const {character, name, profile_path, id} = item;

                    return <><div className="single-cast"><Link to={`/person/${id}`} ><img src={IMG_API + profile_path} alt={name} key={itemIndex} className="cast-photo"></img> </Link>
                    <div className="single-cast-details">
                        <p className="single-cast-name">{name? name : '-'}</p>
                        <p className="single-cast-character">{ character? character:'-'}</p>
                    </div>
                        </div>
                    </>
                })}
            </div>
                <Link to={`/castlist/${id}`} style={{ textDecoration: 'none' }} onClick={getArtists} >
                <button className={`btn result-btn btn-center white-background`} ><span  className="gradient-text">See cast</span></button>
            </Link>
        </>
    )
    }
}

export default MovieDetails;