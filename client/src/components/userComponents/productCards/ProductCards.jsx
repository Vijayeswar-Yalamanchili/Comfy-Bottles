import React, { useState } from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import './ProductCards.css'

function ProductCards({products}) {

    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [addToCart,setAddToCart] = useState(false)

    const getLoginToken = localStorage.getItem('loginToken')

    const handleClose = () => setShow(false)
    const handleShow = (id) => {
        setShow(true)
        getProductData(id)
    }

    const getProductData = async(id) => {

    }

    const handleAddToCart = async(id) => {
        try {
            setAddToCart(true)
        } catch (error) {
            toast.error(error.respose.data.message || error.message)
        }
    }

    const handleRemoveFromCart = async(id) => {
        try {
            setAddToCart(false)
        } catch (error) {
            toast.error(error.respose.data.message || error.message)
        }
    }

    return <>
        <div className="product-grid">
            {
                products.length && products.map((e,i) => {
                    return <>
                        <Card className="product-card" style={{ width: '18rem'}} key={e._id}>
                            <Card.Img variant="top" className='productImage' src={e.image}/>
                            <Card.Body className='px-2'>
                                <Card.Title>{e.name}</Card.Title>
                                <Card.Text>${e.price}</Card.Text>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <Button variant="secondary" className='addCartBtn' onClick={() => handleShow(e._id)}>Info</Button>
                                    {
                                            addToCart ?
                                                <Button variant="none" className='removeCartBtn' onClick={() => handleRemoveFromCart(e._id)}>Remove</Button>
                                            :
                                                <Button variant="none" className='addCartBtn' onClick={() => getLoginToken ? handleAddToCart(e._id) : navigate('/login')}>Buy</Button>
                                    }
                                </div>
                            </Card.Body>
                        </Card>
                    </>
                })    
            }
        </div>

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