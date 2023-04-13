import React, {useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import {AiFillStar} from 'react-icons/ai';

const IMG_API = "https://image.tmdb.org/t/p/original/";
const movieCredits = 'https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=1a4d53fc0dae9cee32537428a438e6c7';
const getImages = 'https://api.themoviedb.org/3/person/${id}/images?api_key=1a4d53fc0dae9cee32537428a438e6c7';
const cameraImg = 'https://images.pexels.com/photos/2335046/pexels-photo-2335046.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'


const Person = () => {
    const {id} = useParams();
    const [person, setPerson] = useState({});
    const [credits, setCredits] = useState([]);
    const [ shortCredits, setShortCredits] = useState([]);
    const [images, setImages] = useState([]);

useEffect(() => {
    async function getTest() {
        try {
  let [details, creditsList, photoList] = await Promise.all([
    fetch(`https://api.themoviedb.org/3/person/${id}?api_key=1a4d53fc0dae9cee32537428a438e6c7`).then(data => data.json()),
    fetch(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=1a4d53fc0dae9cee32537428a438e6c7`).then(data => data.json()),
    fetch(`https://api.themoviedb.org/3/person/${id}/images?api_key=1a4d53fc0dae9cee32537428a438e6c7`).then(data => data.json()),
  ]);
    // console.log(details, creditsList, photoList);
    if(details && creditsList && photoList) {
    const {biography, birthday, known_for_department, name, place_of_birth, profile_path, gender} = details;
    
    
    const personData = {biography, birthday, known_for_department, name, place_of_birth, profile_path, gender};
    setPerson(personData);
    const filtbcg = creditsList.cast;
    const filtBkgd = filtbcg.filter(item => item.poster_path).filter(item => item.media_type === 'movie'|| item.media_type === 'tv')
    const filterNew = [...filtBkgd]
    filtBkgd.length = 14;
    photoList.profiles.length = 5;
    console.log(filterNew);
    const uniqueShortCredits = filterNew.filter(item => item.media_type === 'movie');
if(uniqueShortCredits.length > 5){
    uniqueShortCredits.length = 5;
}
    console.log(uniqueShortCredits);
    setCredits(filtBkgd);
    setImages(photoList.profiles);
    setShortCredits(uniqueShortCredits);
    } else {
        setPerson({});
        setCredits([]);
        setImages([]);
        setShortCredits([]);
    }
}
catch(err) {
  console.log(err);
};
    }
    getTest();
}, []);

    const {biography, birthday, known_for_department, name, place_of_birth, profile_path, gender} = person;
    // console.log(images);
    const department = (dep1, gen1) => {
        if(dep1 === 'Acting' && gen1 === 2){
            return 'Actor';
        } else if(dep1 === 'Acting' && gen1 === 1) {
            return 'Actress'
        } else {
            return 'Director';
        }
    }
    const depFinal = department(known_for_department,gender)
    const getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
const age = getAge(birthday);
    
    const removeTruncate = (e) => {
        e.target.classList.toggle('truncate');
    }
    console.log(shortCredits);

    return (
        <>
        <div className="details-person-background">
            <div className="details-person-container">
                
                {credits.map((item, itemIndex) => {
                    return <img src={`${IMG_API}${item.poster_path}`} alt='test'className="person-bckg-photo" key={itemIndex}></img>
                    
                })}
                <div className="overlay"></div>
                <img src={profile_path ? (IMG_API + profile_path) : (cameraImg) } alt={name} className="main-photo"></img>
                <div className="details-page-main">
                <h1>{name}</h1>
                <span className="info-span"> { depFinal }</span>
                
                <p style={{padding: '15px 0px 0px 0px', fontSize: '1.5rem'}}><span className="info-span">{age} years old</span></p>
            </div>
            </div>
            
        </div>
        <div className="section-middle person">
            <div className="person-overview truncate" onClick={removeTruncate}>{biography}</div>
            
            <div className="gallery">
                {images.map((item, itemIndex) => {
                    return <img src={`${IMG_API}${item.file_path}`} alt="photo" className="known-for-photo"></img>
                })}
            </div>
            <div className="known-for-container">
                <p className="known-for-span">Known for</p>
                <div className="known-for-poster-container">
                    {shortCredits.map((item, itemIndex) => {
                    return <Link to={`/movie/${item.id}`} ><img src={`${IMG_API}${item.poster_path}`} alt='test'className="known-for-poster" key={itemIndex}></img>
                    </Link>
                })}
                </div>
            </div>
        </div>
        </>
    )

}

export default Person;