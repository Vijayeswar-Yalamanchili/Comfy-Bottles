import React, { useContext, useEffect, useState } from 'react'
import './HomeContent.css'
import bottle1 from '../../../assets/bottle1.jpg'
import bottle2 from '../../../assets/bottle2.jpg'
import bottle3 from '../../../assets/bottle3.jpeg'
import bottle4 from '../../../assets/bottle4.jpeg'
import ProductCards from '../productCards/ProductCards'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Dropdown } from 'react-bootstrap'
import { CartDataContext } from '../../../contextApi/CartDataComponent'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'

function HomeContent() {

  const { cart, setCart} = useContext(CartDataContext)
  const [products,setProducts] = useState([])
  let getLoginToken = localStorage.getItem('loginToken')
  let decodedToken = jwtDecode(getLoginToken)
  let id = decodedToken.id

  // const products = [
  //   { _id: 1, name: 'Product 1', description: 'Description 1', price: 10.99, image: bottle1 },
  //   { _id: 2, name: 'Product 2', description: 'Description 2', price: 12.99, image: bottle2 },
  //   { _id: 3, name: 'Product 3', description: 'Description 3', price: 10.99, image: bottle3 },
  //   { _id: 4, name: 'Product 4', description: 'Description 4', price: 12.99, image: bottle4 },
  //   { _id: 5, name: 'Product 5', description: 'Description 5', price: 10.99, image: bottle1 },
  //   { _id: 6, name: 'Product 6', description: 'Description 6', price: 12.99, image: bottle2 },
  //   { _id: 7, name: 'Product 7', description: 'Description 7', price: 10.99, image: bottle3 },
  //   { _id: 8, name: 'Product 8', description: 'Description 8', price: 12.99, image: bottle4 },
  // ]
  const getAllProducts = async() => {
    try {
      let res = await AxiosService.get(`${ApiRoutes.GETALLPRODUCTS.path}/${id}`, { headers : { 'Authorization' : `${getLoginToken}`}})
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
       {/* <Row xs={1} md={2} lg={3} xl={4} className="g-4"> */}
       {
           products && products.map((product,i) => {
               return <ProductCards cart={cart} setCart={setCart} product={product} key={i}/>
           })
       }
       {/* </Row> */}
    </div>
  </div>  
  </>
}

export default HomeContent