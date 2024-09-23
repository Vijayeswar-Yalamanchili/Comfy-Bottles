import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import errorScreenAnime from '../../assets/svg/errorScreenAnime.svg'
import './ErrorScreen.css'

function ErrorScreen() {

  const navigate = useNavigate()
  let getToken = localStorage.getItem('loginToken')

  return <>
    <div className='mx-auto d-flex flex-column justify-content-between align-items-center'>
      <img src={errorScreenAnime} alt="errorscreen" style={{width : "40%", height : "40%"}} />      
      <Button variant='none' className='errorBtn' onClick={()=> getToken === null ? navigate('/login') : navigate('/')}>Go to Home</Button>
    </div>
  </>
}

export default ErrorScreen