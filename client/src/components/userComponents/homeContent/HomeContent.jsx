import React from 'react'
import './HomeContent.css'
import bottle1 from '../../../assets/bottle1.jpg'
import bottle2 from '../../../assets/bottle2.jpg'
import bottle3 from '../../../assets/bottle3.jpeg'
import bottle4 from '../../../assets/bottle4.jpeg'
import ProductCards from '../productCards/ProductCards'

function HomeContent() {

  const products = [
    { id: 1, name: 'Product 1', description: 'Description 1', price: 10.99, image: bottle1 },
    { id: 2, name: 'Product 2', description: 'Description 2', price: 12.99, image: bottle2 },
    { id: 3, name: 'Product 3', description: 'Description 3', price: 10.99, image: bottle3 },
    { id: 4, name: 'Product 4', description: 'Description 4', price: 12.99, image: bottle4 },
    { id: 5, name: 'Product 5', description: 'Description 5', price: 10.99, image: bottle1 },
    { id: 6, name: 'Product 6', description: 'Description 6', price: 12.99, image: bottle2 },
    { id: 7, name: 'Product 7', description: 'Description 7', price: 10.99, image: bottle3 },
    { id: 8, name: 'Product 8', description: 'Description 8', price: 12.99, image: bottle4 },
  ]

  return <>
    <div>HomeContent</div>
    <ProductCards products={products}/>
  </>
}

export default HomeContent