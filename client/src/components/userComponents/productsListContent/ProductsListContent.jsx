import React, { useEffect, useRef, useState } from 'react'
import { Button, Table, Modal, Form, Image } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

function ProductsListContent() {

  const productTitle = useRef()
  const productCategory = useRef()
  const productDescription = useRef()
  const productPrice = useRef()
  const productAvailablity = useRef()
  const productEditTitle = useRef()
  const productEditCategory = useRef()
  const productEditDescription = useRef()
  const productEditPrice = useRef()
  const productEditAvailablity = useRef()
  const [products,setProducts] = useState([])
  const [productData,setProductData] = useState()
  const [show, setShow] = useState(false)
  const [editShow, setEditShow] = useState(false)
  const [image, setImage] = useState(null)
  const [editImage, setEditImage] = useState(null)

  let serverBaseURL = import.meta.env.VITE_SERVER_URL
  let getLoginToken = localStorage.getItem('loginToken')
  let decodedToken = jwtDecode(getLoginToken)
  let id = decodedToken.id

  const handleEditClose = () => setEditShow(false)
  const handleEditShow = (e,productId) => {
    getProductData(productId)
    setEditShow(true)
  }
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const addProduct = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', productTitle.current.value.trim())
    formData.append('category', productCategory.current.value)
    formData.append('description', productDescription.current.value.trim())
    formData.append('price', productPrice.current.value.trim())
    formData.append('availability', productAvailablity.current.value.trim())
    formData.append('imagefile', image)
    const formProps = Object.fromEntries(formData)
    try {
      let res = await AxiosService.post(`${ApiRoutes.ADDPRODUCT.path}/${id}`,formProps, { headers : {
        'Authorization' : `${getLoginToken}`,
        "Content-Type" : 'multipart/form-data'
      } })
      if(res.status === 200) {
          handleClose()
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }
  }

  const getProductData = async(productId) => {
    try {
      let decodedToken = jwtDecode(getLoginToken)
      let id = decodedToken.id
      let res = await AxiosService.get(`${ApiRoutes.CURRENTPRODUCTDATA.path}/${productId}/${id}`, { headers : { 'Authorization' : `${getLoginToken}`}})
      let result = res.data.currentProduct
      if(res.status === 200){
        setProductData(result)
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }
  }

  const handleEditProduct = async(e, productId) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('editTitle', productEditTitle.current.value.trim())
    formData.append('editCategory', productEditCategory.current.value)
    formData.append('editDescription', productEditDescription.current.value.trim())
    formData.append('editPrice', productEditPrice.current.value.trim())
    formData.append('editAvailability', productEditAvailablity.current.value.trim())
    formData.append('editImagefile', editImage)
    const updatedFormProps = Object.fromEntries(formData)
    console.log(updatedFormProps)
    try {
        let res = await AxiosService.put(`${ApiRoutes.EDITPRODUCT.path}/${productId}/${id}`,updatedFormProps, { headers : {
            'Authorization' : `${getLoginToken}`,
            "Content-Type" : 'multipart/form-data'
        }})
        if(res.status === 200){
            handleEditClose()
        }
    } catch (error) {
        toast.error(error.response.data.message || error.message)
    }
  }

  const handleDeleteProduct = async(pId) => {
    try {
        let res = await AxiosService.delete(`${ApiRoutes.DELETEPRODUCT.path}/${pId}`, { headers : {
            'Authorization' : `${getLoginToken}`
        }})
        toast.success(res.data.message)
    } catch (error) {
        toast.error(error.response.data.message || error.message)
    }
  }

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
    <div className='p-5'>
      <div className='d-flex justify-content-between align-items-center'>
        <h4>Products</h4>
        <Button onClick={handleShow}>Add Product</Button>
      </div>
      <div className='mt-3'>
        <Table striped bordered >
          <thead>
            <tr>
              <th className='text-center'>S.no</th>
              <th className='text-center'>Product Title</th>
              <th className='text-center'>Description</th>
              <th className='text-center'>Price</th>
              <th className='text-center'>Category</th>
              <th className='text-center'>Available Count</th>
              <th className='text-center'>Image</th>
              <th className='text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              products.length ? products.map((e,i)=> {
                return <tr  key={i}>
                  <td className='text-center'>{i+1}</td>
                  <td className='text-center'>{e.productTitle}</td>
                  <td className='text-center'>{e.productDescription}</td>
                  <td className='text-center'>{'\u20B9'}{e.productPrice}</td>
                  <td className='text-center'>{e.productCategory}</td>
                  <td className='text-center'>{e.productAvailability} nos.</td>
                  <td className='text-center'><Image src={`${serverBaseURL}/${e.productImage}`} style={{height : "5rem"}}/></td>
                  <td className='text-center'>
                      <Button variant='primary' onClick={(event) => handleEditShow(event,e._id)}><FontAwesomeIcon icon={faEdit}/></Button>
                      &nbsp; 
                      <Button variant='danger' onClick={() => handleDeleteProduct(e._id)}><FontAwesomeIcon icon={faTrash}/></Button>
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
      <Form onSubmit={addProduct}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
              <Form.Label>Product Title</Form.Label>
              <Form.Control type="text" name='title' ref={productTitle} placeholder="Enter product name"/>
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Product Category </Form.Label>
            <Form.Select name='category'  ref={productCategory} onChange={()=> productCategory.current.value}>
              <option value = "-">Select Category</option>
              <option value="Stainless Stell">Stainless Stell</option>
              <option value="Bronze">Bronze</option>
              <option value="Temperature converter">Temperature converter</option>
              <option value="Sports Confy">Sports Confy</option>
            </Form.Select> 
          </Form.Group>
          <Form.Group className="mb-3">
              <Form.Label>Product Description</Form.Label>
              <Form.Control type="text" name='description'  ref={productDescription} placeholder="Enter Description"/>
          </Form.Group>
          <Form.Group className="mb-3">
              <Form.Label>Product Price</Form.Label>
              <Form.Control type="text" name='price'  ref={productPrice} placeholder="Enter Price"/>
          </Form.Group>
          <Form.Group className="mb-3">
              <Form.Label>Product Availablity in Nos</Form.Label>
              <Form.Control type="text" name='availability'  ref={productAvailablity} placeholder="Enter Availablity in Nos"/>
          </Form.Group>
          <Form.Group className="mb-3">
              <Form.Label>Product Image<span style={{fontSize:'small'}}>(Name should not contain space)</span></Form.Label>
              <Form.Control type="file" name='imagefile' onChange={(e)=> setImage(e.target.files[0])} accept="image/*"/>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" type='submit'>Add Product</Button>
        </Modal.Footer>
      </Form>
    </Modal>

    {/* Edit product modal */}
    <Modal show={editShow} onHide={handleEditClose}>
    <Form onSubmit={(e) => handleEditProduct(e,productData?._id)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
              <Form.Label>Product Title</Form.Label>
              <Form.Control type="text" name='editTitle' defaultValue={productData?.productTitle} ref={productEditTitle} placeholder="Enter product name"/>
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Product Category </Form.Label>
            <Form.Select name='editCategory' defaultValue={productData?.productCategory}  ref={productEditCategory} onChange={()=> productEditCategory.current.value}>
              <option value = "-">Select Category</option>
              <option value="Stainless Stell">Stainless Stell</option>
              <option value="Bronze">Bronze</option>
              <option value="Temperature converter">Temperature converter</option>
              <option value="Sports Confy">Sports Confy</option>
            </Form.Select> 
          </Form.Group>
          <Form.Group className="mb-3">
              <Form.Label>Product Description</Form.Label>
              <Form.Control type="text" name='editDescription' defaultValue={productData?.productDescription} ref={productEditDescription} placeholder="Enter Description"/>
          </Form.Group>
          <Form.Group className="mb-3">
              <Form.Label>Product Price</Form.Label>
              <Form.Control type="text" name='editPrice' defaultValue={productData?.productPrice} ref={productEditPrice} placeholder="Enter Price"/>
          </Form.Group>
          <Form.Group className="mb-3">
              <Form.Label>Product Availablity in Nos</Form.Label>
              <Form.Control type="text" name='editAvailability' defaultValue={productData?.productAvailability} ref={productEditAvailablity} placeholder="Enter Availablity in Nos"/>
          </Form.Group>
          <Form.Group className="mb-3">
              <Form.Label>Product Image<span style={{fontSize:'small'}}>(Name should not contain space)</span></Form.Label>
              <Form.Control type="file" name='editImagefile' defaultValue={productData?.productImage} onChange={(e)=> setEditImage(e.target.files[0])} accept="image/*"/>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>Close</Button>
          <Button variant="primary" type='submit'>Update Product</Button>
        </Modal.Footer>
      </Form>
    </Modal>

  </>
}

export default ProductsListContent