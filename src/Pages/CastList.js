import React, {useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import { useGlobalContext } from '../context';
import {AiFillStar} from 'react-icons/ai';


const IMG_API = "https://image.tmdb.org/t/p/w1280";
const cameraImg = 'https://images.pexels.com/photos/2335046/pexels-photo-2335046.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'

const CastList = () => {
    const {id} = useParams();
    const {cast, setCast, movie, setMovie } = useGlobalContext();
    

    async function getCastAndDeets(){
        let [cast, details] = await Promise.all([fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=1a4d53fc0dae9cee32537428a438e6c7`).then(data => data.json()),
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=1a4d53fc0dae9cee32537428a438e6c7`).then(data => data.json())]);
        const finalCast = cast.cast;
        console.log(details)
        setCast(finalCast);
        const {title,  release_date, vote_average, poster_path} = details;
        const newMovie = {title,  release_date, vote_average, poster_path};
        setMovie(newMovie);
    }

    useEffect(()=>{
        getCastAndDeets();
    },[])

    const {title,  release_date, vote_average, poster_path} = movie;
    const year = release_date.substring(0,4);
    const rating = vote_average.toFixed(1);
    

    return (
        <>
        <div className="header-container">
            <img src={poster_path ? (IMG_API + poster_path) : (cameraImg)}></img>
            <div className="cast-info-container">
                <p>{title}</p>
                <p>{year}</p>
                <p className="full-cast">Full Cast</p>
                <p><span className="rating-icon"><AiFillStar style={{color: 'yellow'}}/></span><span className="rating-number">{rating}</span></p>
            </div>
        </div>
        <div className="people-container">
            {cast.map((item, itemIndex) => {
                const {name, character, profile_path, id} = item;

                return <>
                <div className="person-container" key={itemIndex}>
                    <Link to={`/person/${id}`} ><img src={ profile_path ? (IMG_API + profile_path) : (cameraImg)}  alt={name} className="person-photo"/></Link>
                    <div className="person-info">
                        <p className="category">name</p>
                        <p>{name}</p>
                        <p className="category">character</p>
                        <p>{character}</p>
                        
                        </div>
                </div>
                </>
            })}
        </div>
        </>
    )

}

export default CastList;