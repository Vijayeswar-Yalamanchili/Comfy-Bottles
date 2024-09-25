import React, { useContext, useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { CartDataContext } from '../../contextApi/CartDataComponent'
import ProductCards from '../productCards/ProductCards'
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'
import CategoryFilter from '../categoryFilter/CategoryFilter'
import SearchBar from '../searchBar/SearchBar'
import './HomeContent.css'

function HomeContent() {

  const { cart, setCart} = useContext(CartDataContext)
  const [products,setProducts] = useState([])
  const [category, setCategory] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const getAllProducts = async() => {
    try {
      let res = await AxiosService.get(`${ApiRoutes.GETALLPRODUCTS.path}?category=${category}`)
      if(res.status === 200) {
        setProducts(res.data.productsList)
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }
  }

  const filteredProducts = products.filter(product =>
    product.productTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );


  useEffect(()=> {
    getAllProducts()
  },[category])

  return <>
  <div className='px-5 py-2'>
    <div className='filterArea d-flex px-1 mt-4'>
      <SearchBar onSearch={setSearchTerm} />
      <CategoryFilter onFilter={setCategory} />
    </div>
    
    <div className='product-grid'>
       {
           filteredProducts.length ? filteredProducts.map((product,i) => {
               return <ProductCards cart={cart} setCart={setCart} product={product} key={i}/>
           }) :<>           
            <Card style={{width : "20rem",marginLeft : "50%"}}>
              <Card.Body>Products Not Available</Card.Body>
            </Card>
          </>
       }
    </div>
  </div>  
  </>
}

export default HomeContent