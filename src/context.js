import React, { useState, useContext, useEffect } from 'react'


const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1a4d53fc0dae9cee32537428a438e6c7&query=";
const IMG_API = "https://image.tmdb.org/tp/w1280";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=1a4d53fc0dae9cee32537428a438e6c7&query=";
const artistURL = 'https://api.themoviedb.org/3/person/popular?api_key=1a4d53fc0dae9cee32537428a438e6c7';


const AppContext = React.createContext()

const AppProvider = ({ children }) => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [movIndex, setMovIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [artistList, setArtistList] = useState([]);
    const [cast, setCast] = useState([]);
    const [movie, setMovie] = useState(null);
    const [isActive, setIsActive] = useState(false);

    
        async function getArtists() {
            const response = await fetch(`${artistURL}`);
            const data = await response.json();
            setArtistList(data.results);
        }
        

        async function getMovies() {
        const moviesResponse = await fetch(FEATURED_API);
        const moviesFinal = await moviesResponse.json();
        setMovies(moviesFinal.results);
        }

        useEffect(() => {
          getArtists();
        getMovies();
        },[]);

    useEffect(() => {
    const lastIndex = movies.length - 1;
    if (movIndex < 0) {
      setMovIndex(lastIndex);
    }
    if (movIndex > lastIndex) {
      setMovIndex(0);
    }
  }, [movIndex, movies]); 

  useEffect(() => {
    let slider = setInterval(() => {
      setMovIndex(movIndex + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [movIndex]);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setIsActive(false);
    setSearchTerm('');
  };
  
  return (
    <AppContext.Provider
      value={{movies, setMovies, movIndex, setMovIndex, searchTerm, setSearchTerm, openModal, closeModal, isModalOpen, getMovies, artistList, getArtists, cast, setCast, movie, setMovie, isActive, setIsActive}}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }