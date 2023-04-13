import React, {useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom";

const genreListURL = 'https://api.themoviedb.org/3/discover/movie?api_key=1a4d53fc0dae9cee32537428a438e6c7&with_genres='
const IMG_API = "https://image.tmdb.org/t/p/original/";

const Category = () => {
    const {id} = useParams();
    const [movieList, setMovieList] = useState([]);

    useEffect(() => {
        async function getGenreMovies() {
            try {
                const response = await fetch(`${genreListURL}${id}`);
                const data = await response.json();
                console.log(data);
                setMovieList(data.results);
            } catch (error) {
                console.log(error)
            }
        }
        getGenreMovies();
    }, [id])



    return <>
        <div className="genre-container">
            {movieList.map((item, itemIndex) => {
                const {title, poster_path, id} = item;

            return <Link to={`/movie/${id}`} > <p className='single-genre movie' key={itemIndex} style={{minHeight: '300px',
            backgroundImage: `linear-gradient(rgba(0,0,0, 0) 0%,rgba(0,0,0, 1) 100%), url(${IMG_API}${poster_path})`
        }}>
                    <span className='genre-name small-font'>{title}</span>
                </p>
                </Link>
            })}
        </div>
    
    </>

}

export default Category;