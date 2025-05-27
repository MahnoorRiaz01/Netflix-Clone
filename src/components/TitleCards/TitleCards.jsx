import React, { useEffect, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

 
const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([]);
  
const cardsRef = useRef();

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2EwMjA0ZmYxZjMzZWMxNTQ3NTAwNWExNzM0ZmQ2MyIsIm5iZiI6MTc0ODI3NTA0My42NTQsInN1YiI6IjY4MzQ4ZjYzZjE0Zjc0MDZhNTgzODIzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h98fsjiPBYMQaAen-VMULD1ztsHHlBLTHaM15qLdNKg'
  }
};


const handleWheel = (event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY;
}
useEffect(()=>{


fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));

  cardsRef.current.addEventListener('wheel', handleWheel);
},[])

  return (
    <div className='titlecards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef} >
        
        {apiData.map((card, index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>                                                                                                      
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards