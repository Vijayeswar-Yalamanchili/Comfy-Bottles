import React from 'react'
import './LoadingComponent.css'
import { Spinner } from 'react-bootstrap'
import AppNavbar from '../navbar/AppNavbar'

function LoadingComponent() {
  return <>
    <AppNavbar/>
    <div>
      <h5 className='loader'><Spinner animation='border'/></h5>
    </div>
  </>
}

export default LoadingComponent