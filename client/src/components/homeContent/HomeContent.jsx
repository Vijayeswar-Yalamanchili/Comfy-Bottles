import React, { useContext, useEffect, useState } from 'react'
import './HomeContent.css'
import ProductCards from '../productCards/ProductCards'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Dropdown } from 'react-bootstrap'
import { CartDataContext } from '../../contextApi/CartDataComponent'
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'

function HomeContent() {

  const { cart, setCart} = useContext(CartDataContext)
  const [products,setProducts] = useState([])
  let getLoginToken = localStorage.getItem('loginToken')


  const getAllProducts = async() => {
    try {
      let res = await AxiosService.get(`${ApiRoutes.GETALLPRODUCTS.path}`)
      if(res.status === 200) {
        setProducts(res.data.productsList)
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }
  }

  useEffect(()=> {
    getAllProducts()
  },[products])

  return <>
  <div className='px-5 py-2'>
    <div className='filterArea d-flex px-1 mt-4'>
      <div className="searchField d-flex">
        <input type="search" name="search" className='ps-2' id="search" placeholder='Search by product'/>
        <FontAwesomeIcon icon={faMagnifyingGlass} className='searchIcon'/>
      </div> 
      <div className="filterDropdown me-3">
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
            <FontAwesomeIcon icon={faFilter}/> 
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
    
    <div className='product-grid'>
       {
           products && products.map((product,i) => {
               return <ProductCards cart={cart} setCart={setCart} product={product} key={i}/>
           })
       }
    </div>
  </div>  
  </>
}

export default HomeContent