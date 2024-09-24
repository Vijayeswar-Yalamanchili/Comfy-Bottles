import React, { useState } from 'react'
import { Button, Card, Modal, Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'
import './ProductCards.css'

function ProductCards({product}) {

    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [addToCart,setAddToCart] = useState(false)
    const [loading, setLoading] = useState(false)

    const getLoginToken = localStorage.getItem('loginToken')
    let decodedToken = jwtDecode(getLoginToken)
    let id = decodedToken.id

    const handleClose = () => setShow(false)
    const handleShow = (productId) => {
        setShow(true)
        getProductData(productId)
    }

    const getProductData = async(productId) => {

    }

    const handleAddCart = async(productId) => {
        try {
            setLoading(true)
            let res = await AxiosService.put(`${ApiRoutes.ADDCARTLIST.path}/${productId}/${id}`,{ headers : { 'Authentication' : `${getLoginToken}` }})
            if(res.status === 200) {
                setToggle(!toggle)
                setCart(cart+1)
            }
            setLoading(false)
        } catch (error) {
            console.log(error.message)
            toast.error(error.response.data.message || error.message)
        }
    }

    const handleRemoveCart = async(productId) => {
        try {
            setLoading(true)
            let res = await AxiosService.put(`${ApiRoutes.REMOVECARTLIST.path}/${productId}/${id}`,{ headers : { 'Authentication' : `${getLoginToken}` }})
            if(res.status === 200) {
                setToggle(!toggle)
                setCart(cart-1)
            }
            setLoading(false)
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    return <>
        <Card className="product-card" style={{ width: '18rem'}} key={product._id}>
            <Card.Img variant="top" className='productImage' src={product.image}/>
            <Card.Body className='px-2'>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
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
            <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    </>
}

export default ProductCards