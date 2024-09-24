import React from 'react'
import './ProductsList.css'
import AppNavbar from '../../../../components/userComponents/navbar/AppNavbar'
import ProductsListContent from '../../../../components/userComponents/productsListContent/ProductsListContent'

function ProductsList() {
  return <>
    <AppNavbar/>
    <ProductsListContent/>
  </>
}

export default ProductsList