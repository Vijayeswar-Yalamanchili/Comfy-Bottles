import React, { useState } from 'react'
import { Button, Table, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'

function ProductsListContent() {

  const [products,setProducts] = useState([])
  const [show, setShow] = useState(false)
  const [editShow, setEditShow] = useState(false)

  let getLoginToken = localStorage.getItem('adminLoginToken')

  const handleEditClose = () => setEditShow(false)
  const handleEditShow = () => setEditShow(true)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const addProduct = async() => {
    try {
      
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }
  }

  const getProductData = async(productId) => {
    try {
      let decodedToken = jwtDecode(getLoginToken)
      let id = decodedToken.id
      let res = await AxiosService.get(`${ApiRoutes.CURRENTPRODUCTDATA.path}/${productId}/${id}`, { headers : { 'Authorization' : `${getLoginToken}`}})
      let result = res.data.currentproduct
      if(res.status === 200){
          setCurrentUsers(result)
          handleEditShow()
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }
  }

  return <>
    <div className='p-5'>
      <div className='d-flex justify-content-between align-items-center'>
        <h4>Products</h4>
        <Button onClick={handleShow}>Add Product</Button>
      </div>
      <div className='mt-3'>
        <Table striped bordered >
          <thead>
            <tr>
              <th>S.no</th>
              <th>Image</th>
              <th>Product Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Available Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              products.length ? products.map((e,i)=> {
                return <tr  key={i}>
                  <td>{i+1}</td>
                  <td>{e.image}</td>
                  <td>{e.title}</td>
                  <td>{e.description}</td>
                  <td>{e.price}</td>
                  <td>{e.availableCount}</td>
                  <td className='userActionBtns'>
                      <Button variant='primary' onClick={() => getProductData(e._id)}><FontAwesomeIcon icon={faEdit}/></Button>
                      &nbsp; 
                      <Button variant='danger' onClick={() => handlePopUp(e._id)}><FontAwesomeIcon icon={faTrash}/></Button>
                  </td>
                </tr>
              }) : null
            }
          </tbody>
        </Table>
      </div>
    </div>

    {/* Add product modal */}
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Product</Modal.Title>
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

    {/* Edit product modal */}
    <Modal show={editShow} onHide={handleEditClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleEditClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleEditClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>

  </>
}

export default ProductsListContent