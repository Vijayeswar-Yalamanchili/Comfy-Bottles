import express from 'express'
import auth from '../helper/auth.js'
import userController from '../controller/userController.js'
import productImageUpload from '../helper/productImageUpload.js'
import ProductController from '../controller/ProductController.js'

const router = express.Router()

//Products
router.post('/addproduct/:id', auth.authenticate, productImageUpload.imageUpload.single('imagefile'),ProductController.addProduct)
router.get('/currentproductdata/:productId/:id',auth.authenticate, ProductController.getCurrentProductData)
router.get('/allproducts', ProductController.getAllProducts)
router.put('/updateproduct/:productId/:id',auth.authenticate, productImageUpload.imageUpload.single('editImagefile'),ProductController.updateProduct)
router.delete('/deleteproduct/:id',auth.authenticate, ProductController.deleteProduct)
router.put('/addcart/:productId/:id', auth.authenticate, userController.addCartList)
router.put('/removecart/:productId/:id', auth.authenticate, userController.removeCartList)

export default router