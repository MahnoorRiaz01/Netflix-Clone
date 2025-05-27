import React, { useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} = useParams();

  const navigate = useNavigate();

const [apiData,setApiData] = useState({
  name:'',
  key:'',
  published_at:'',
  type:''
})
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2EwMjA0ZmYxZjMzZWMxNTQ3NTAwNWExNzM0ZmQ2MyIsIm5iZiI6MTc0ODI3NTA0My42NTQsInN1YiI6IjY4MzQ4ZjYzZjE0Zjc0MDZhNTgzODIzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h98fsjiPBYMQaAen-VMULD1ztsHHlBLTHaM15qLdNKg'
  }
};
useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results[0]))
  .catch(err => console.error(err));
},[])


  
  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}} />
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title='trailor' frameborder="0" allowFullScreen></iframe>
          <div className="player-info">
            <p>{apiData.published_at.slice(0,10)}</p>
            <p>{apiData.name}</p>
            <p>{apiData.type}</p>
          </div>
          </div>
  )
}

export default Player