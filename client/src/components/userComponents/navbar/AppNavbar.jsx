import React, { useContext, useEffect, useState } from 'react'
import { Button, Image } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faBars, faBasketShopping, faCartShopping, faHeartPulse, faHouse, faMagnifyingGlass, faPhone, faPowerOff, faRectangleList, faRightToBracket, faUserGear, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { useLogout } from '../../../hooks/UseLogout'
import { CartDataContext } from '../../../contextApi/CartDataComponent'
import logo from '../../../assets/png/comfyHolders.png'
import './AppNavbar.css'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'

function AppNavbar() {

  const navigate = useNavigate()
  let logout = useLogout()
  let { cart } = useContext(CartDataContext)

  const [myProfile, setMyProfile] = useState(false)
  const [respMenu, setRespMenu] = useState(false)  
  const [userAuth,setUserAuth] = useState()

  const getLoginToken = localStorage.getItem('loginToken')


  const handleMyProfile = () => setMyProfile(!myProfile)
  const handleRespMenu = () => setRespMenu(!respMenu)

  const getUser = async() => {
    try {
        if(getLoginToken){
          const decodedToken = jwtDecode(getLoginToken)
          const id = decodedToken.id
          let res = await AxiosService.get(`${ApiRoutes.CURRENTUSER.path}/${id}`,{ headers : { 'Authorization' : ` ${getLoginToken}`}})
          let result = res.data.currentUser
          if(res.status === 200){
            setUserAuth(result)                    
          }
        }
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }
  }    

  const handleLogout = async() => {
    try {
      if(getLoginToken){
        const decodedToken = jwtDecode(getLoginToken)
        const id = decodedToken.id
        let res = await AxiosService.put(`${ApiRoutes.LOGOUT.path}/${id}`,{ headers : { 'Authorization' : ` ${getLoginToken}`}})
        if(res.status === 200){
          logout()
        }
      }
    } catch (error) {
        console.log(error)
      toast.error(error.response.data.message || error.message)
    }
  }

  useEffect(()=>{
    getUser()
  },[userAuth,cart])

  return <>
    <div className='navBlock'>
      <div className='d-flex justify-content-between align-items-center px-3'>
        <Image className='py-1' src={logo} height={80} onClick={()=> navigate('/')} roundedCircle/>

        {
          getLoginToken ? 
            <div className='navs'>
              <Button variant='none' className='authButtons' onClick={()=> navigate('/')}>Home</Button>
              <Button variant='none' className='authButtons' onClick={()=> navigate('/productsList')}>Products-List</Button>
              <Button variant='none' className='authButtons cartBtn' onClick={()=> navigate('/cart')}>
                <FontAwesomeIcon icon={faCartShopping} style={{ height : '1.5rem'}}/>
                <div className='cartBadge' style={{fontSize :"1.2rem"}}>{cart}</div>
              </Button>
              <div className='ms-3' onClick={handleMyProfile}><FontAwesomeIcon icon={faUser} style={{height:"1.5rem", color:"white"}}/></div>
            </div>
          :
          <div className='navs authNavs'>
            <Button variant='none' className='authButtons' onClick={()=> navigate('/register')}>Register</Button>
            <Button variant='none' className='authButtons' onClick={()=> navigate('/login')}>Login</Button>          
          </div>
        }

        <div className='navsIcon' onClick={()=> handleRespMenu()}>
          <Button variant='none' className='authButtons cartBtn' onClick={()=> navigate('/cart')}>
            <FontAwesomeIcon icon={faCartShopping} style={{ height : '1.5rem'}}/>
            <div className='cartBadge' style={{fontSize :"1.2rem"}}>{cart}</div>
          </Button>
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
                <FontAwesomeIcon icon={faUserGear} size='xl' style={{color: "#d98c2d", width:"18px", height:"16px"}}/>My Account
              </span>
            </Link>
            <Link className="listMenu list-group-item list-group-item-action" onClick={handleLogout}>
              <span className='d-flex align-items-center' style={{gap:"15px"}}>
                <FontAwesomeIcon icon={faPowerOff} size='xl' style={{color: "#d98c2d", width:"18px", height:"16px"}}/>Logout
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
            <Link to={`/productslist`} className="listMenu list-group-item list-group-item-action">
              <span className='d-flex align-items-center justify-content-start' style={{gap:"15px"}}>
                <FontAwesomeIcon icon={faAddressCard} size='xl' style={{color: "#d98c2d", width:"18px", height:"16px"}}/>Products-List
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