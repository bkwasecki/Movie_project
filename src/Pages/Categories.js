import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

const URL = 'https://api.themoviedb.org/3/genre/movie/list?api_key=1a4d53fc0dae9cee32537428a438e6c7';
const cameraImg = 'https://images.pexels.com/photos/66134/pexels-photo-66134.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

export default function Categories () {

    const [genreList, setGenreList] = useState([]);

    useEffect(() => {
        async function getGenres(){
            try {
            const response = await fetch(`${URL}`);
            const data = await response.json();
            if(data){
            const genres = data.genres;
            const newGenreList = genres;
            setGenreList(newGenreList);
            }else {
                setGenreList(null);
            }
            } catch (error) {
                console.log(error);
            }
        }
        getGenres();
    }, []);

    if(!genreList){
        return <h2>there is no genre to display</h2>
    } else {

    console.log(genreList);

    return (
        <>
        <div className='genre-container'>
            {genreList.map((item, itemIndex) => {
                
                return <Link to={`/category/${item.id}`} > <p className='single-genre' key={itemIndex} style={{
            backgroundImage: `linear-gradient(rgba(0,0,0, 0) 0%,rgba(0,0,0, 1) 100%), url(${cameraImg})`
        }}>
                    <span className='genre-name'>{item.name}</span>
                </p>
                </Link>
            })}
         
        </div>
        </>
    )
    }
}