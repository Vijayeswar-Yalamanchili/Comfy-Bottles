import React, { useState } from 'react'
import { Button, Card, Image, Modal, Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'
import './ProductCards.css'

function ProductCards({product}) {

    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [addToCart,setAddToCart] = useState(false)
    const [loading, setLoading] = useState(false)
    const [toggle, setToggle] = useState(false)
    const [cart, setCart] = useState()
    const [productData,setProductData] = useState()

    const getLoginToken = localStorage.getItem('loginToken')
    let serverBaseURL = import.meta.env.VITE_SERVER_URL

    const handleClose = () => setShow(false)
    const handleShow = (productId) => {
        setShow(true)
        getProductData(productId)
    }

    const getProductData = async(productId) => {
        try {
          if(getLoginToken){
            let decodedToken = jwtDecode(getLoginToken)
            let id = decodedToken.id
            let res = await AxiosService.get(`${ApiRoutes.CURRENTPRODUCTDATA.path}/${productId}/${id}`, { headers : { 'Authorization' : `${getLoginToken}`}})
            let result = res.data.currentProduct
            if(res.status === 200){
                setProductData(result)
            }
          }else{
            navigate('/login')
          }
        } catch (error) {
          toast.error(error.response.data.message || error.message)
        }
      }

    const handleAddCart = async(productId) => {
        try {
            if(getLoginToken){
                setLoading(true)
                const decodedToken = jwtDecode(getLoginToken)
                const id = decodedToken.id
                let res = await AxiosService.put(`${ApiRoutes.ADDCARTLIST.path}/${productId}/${id}`,{ headers : { 'Authentication' : `${getLoginToken}` }})
                if(res.status === 200) {
                    setToggle(!toggle)
                    setCart(cart+1)
                    setAddToCart(!addToCart)
                }
            }else{
                navigate('/login')
            }
            setLoading(false)
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    const handleRemoveCart = async(productId) => {
        try {
            setLoading(true)
            const decodedToken = jwtDecode(getLoginToken)
            const id = decodedToken.id
            let res = await AxiosService.put(`${ApiRoutes.REMOVECARTLIST.path}/${productId}/${id}`,{ headers : { 'Authentication' : `${getLoginToken}` }})
            if(res.status === 200) {
                setToggle(!toggle)
                setCart(cart-1)
                setAddToCart(!addToCart)
            }
            setLoading(false)
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    return <>
        <Card className="product-card" style={{ width: '18rem'}} key={product._id}>
            <Card.Img variant="top" className='productImage' src={`${serverBaseURL}/${product.productImage}`}/>
            <Card.Body className='px-2'>
                <Card.Title>{product.productTitle}</Card.Title>
                <Card.Text>${product.productPrice}</Card.Text>
                <div className='d-flex justify-content-between align-items-center'>
                    <Button variant="secondary" className='addCartBtn' onClick={() => handleShow(product._id)}>Info</Button>
                    {
                        !addToCart ?
                        <Button variant="none" className='addCartBtn' onClick={() => handleAddCart(product._id)} disabled={loading}>{loading ? <Spinner animation="border" /> : 'Add to Cart'}</Button>
                        :
                        <Button variant="none" className='removeCartBtn' onClick={() => handleRemoveCart(product._id)} disabled={loading}>{loading ? <Spinner animation="border" /> : 'Cart off' }</Button>
                    }
                </div>
            </Card.Body>
        </Card>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{productData?.productTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-3'>
                <div style={{marginLeft : "35%"}}><Image src={`${serverBaseURL}/${product.productImage}`} style={{height : "12rem"}}/></div>
                <hr />
                <div className='mt-3'>
                    <p>Description : {productData?.productDescription}</p>
                    <p>Price : {'\u20B9'}{productData?.productPrice}</p>
                    <p>In-Stock : {productData?.productAvailability}</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
            {
                !addToCart ?
                <Button variant="primary" className='addCartBtn' onClick={() => handleAddCart(product._id)} disabled={loading}>{loading ? <Spinner animation="border" /> : 'Add to Cart'}</Button>
                :
                <Button variant="none" className='removeCartBtn' onClick={() => handleRemoveCart(product._id)} disabled={loading}>{loading ? <Spinner animation="border" /> : 'Cart off' }</Button>
            }
            </Modal.Footer>
        </Modal>
    </>
}

export default ProductCards