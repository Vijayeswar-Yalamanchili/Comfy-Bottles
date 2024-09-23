import React, { useState } from 'react'
import { Button, Image } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faBars, faBasketShopping, faCartShopping, faHeartPulse, faHouse, faMagnifyingGlass, faPhone, faPowerOff, faRectangleList, faRightToBracket, faUserGear, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import logo from '../../../assets/png/comfyHolders.png'
import './AppNavbar.css'

function AppNavbar() {

  const navigate = useNavigate()
  const getLoginToken = localStorage.getItem('loginToken')
  const [myProfile, setMyProfile] = useState(false)
  const [respMenu, setRespMenu] = useState(false)

  const handleMyProfile = () => setMyProfile(!myProfile)
  const handleRespMenu = () => setRespMenu(!respMenu)

  return <>
    <div className='navBlock'>
      <div className='d-flex justify-content-between align-items-center px-3'>
        <Image className='py-1' src={logo} height={80} onClick={()=> navigate('/')} roundedCircle/>

        {
          getLoginToken ? 
            <div className='navs d-flex'>
            <Button variant='none' className='authButtons' onClick={()=> navigate('/register')}>Home</Button>
            <Button variant='none' className='authButtons' onClick={()=> navigate('/login')}>Products</Button>          
          </div>
          :
          <div className='navs d-flex'>
            <Button variant='none' className='authButtons' onClick={()=> navigate('/register')}>Register</Button>
            <Button variant='none' className='authButtons' onClick={()=> navigate('/login')}>Login</Button>          
          </div>
        }

        <div className='navsIcon' onClick={()=> handleRespMenu()}>
          <FontAwesomeIcon icon={faBars} style={{height:"1.5rem", color:"white"}} />   
        </div>

      </div>               
    </div>

    {
      myProfile ? 
        getLoginToken ?
          <div className="myProfileDrpdwn list-group list-group-flush px-1">
            <div className="listMenu list-group-item list-group-item-action"><b style={{textTransform : 'capitalize'}}>Hi, {userAuth?.firstName}</b></div>
            <Link to={`/myaccount`} className="listMenu list-group-item list-group-item-action">
              <span className='d-flex align-items-center' style={{gap:"15px"}}>
                <FontAwesomeIcon icon={faUserGear} size='xl' style={{color: "#0E6B06", width:"18px", height:"16px"}}/>My Account
              </span>
            </Link>
            <Link to={`/myorders`} className="listMenu list-group-item list-group-item-action">
              <span className='d-flex align-items-center' style={{gap:"15px"}}>
                <FontAwesomeIcon icon={faRectangleList} size='xl' style={{color: "#0E6B06", width:"18px", height:"16px"}}/>My Orders
              </span>
            </Link>
            <Link className="listMenu list-group-item list-group-item-action" onClick={handleLogout}>
              <span className='d-flex align-items-center' style={{gap:"15px"}}>
                <FontAwesomeIcon icon={faPowerOff} size='xl' style={{color: "#0E6B06", width:"18px", height:"16px"}}/>Logout
              </span>
            </Link>
          </div> 
        :
          <div className="myProfileDrpdwn list-group list-group-flush px-1">
            <Link to={'/login'} className="listMenu list-group-item list-group-item-action">
              <span className='d-flex align-items-center' style={{gap:"15px"}}>
                <FontAwesomeIcon icon={faRightToBracket} size='xl' style={{color: "#0E6B06", width:"18px", height:"16px"}}/>Login
              </span>
            </Link>
            <Link to={`/register`} className="listMenu list-group-item list-group-item-action">
              <span className='d-flex align-items-center' style={{gap:"15px"}}>
                <FontAwesomeIcon icon={faUserPlus} size='xl' style={{color: "#0E6B06", width:"18px", height:"16px"}}/>Register
              </span>
            </Link>
          </div> 
      : null
    }

    {
      respMenu ?
        getLoginToken ?
          <div className="myRespMenuDrpdwn list-group list-group-flush px-1">
            <Link to={`/`} className="listMenu list-group-item list-group-item-action">
              <span className='d-flex align-items-center justify-content-start' style={{gap:"15px"}}>
                <FontAwesomeIcon icon={faHouse} size='xl' style={{color: "#d98c2d", width:"18px", height:"16px"}}/>Home
              </span>
            </Link>
            <Link to={`/about`} className="listMenu list-group-item list-group-item-action">
              <span className='d-flex align-items-center justify-content-start' style={{gap:"15px"}}>
                <FontAwesomeIcon icon={faAddressCard} size='xl' style={{color: "#d98c2d", width:"18px", height:"16px"}}/>Products
              </span>
            </Link>
          </div> 
        :
          <div className="myRespMenuDrpdwn list-group list-group-flush px-1">
            <Link to={`/login`} className="listMenu list-group-item list-group-item-action">
              <span className='d-flex align-items-center justify-content-start' style={{gap:"15px"}}>
                <FontAwesomeIcon icon={faHouse} size='xl' style={{color: "#d98c2d", width:"18px", height:"16px"}}/>Login
              </span>
            </Link>
            <Link to={`/register`} className="listMenu list-group-item list-group-item-action">
              <span className='d-flex align-items-center justify-content-start' style={{gap:"15px"}}>
                <FontAwesomeIcon icon={faHouse} size='xl' style={{color: "#d98c2d", width:"18px", height:"16px"}}/>Register
              </span>
            </Link>
          </div>
      : null
    }
  </>
}

export default AppNavbar