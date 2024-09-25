import ProductsModel from '../models/productModel.js'

const addProduct = async(req,res) => {
    try {
        const { title, category, description, price, availability } = req.body
        const { filename } = req.file
        const addproduct = await ProductsModel.create({productTitle : title, productCategory : category, productDescription : description, productPrice : price, productAvailability: availability, productImage : filename})
        res.status(200).send({
            addproduct
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in adding new product"
        })
    }
}

const getAllProducts = async(req,res) => {
    try {
        let productsList = await ProductsModel.find()
        res.status(200).send({
            productsList
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in getting product list"
        })
    }
}

const getCurrentProductData = async(req,res) => {
    try {
        // console.log(req.params)
        let currentProduct = await ProductsModel.findById({_id : req.params.productId})
        res.status(200).send({
            currentProduct
        }) 
    } catch (error) {
        res.status(500).send({
            message : "Internal error in fetching Current Product Details"
        })
    }
}

const updateProduct = async(req,res) => {
    try {
        console.log(req.file)
        const { editTitle, editCategory, editDescription, editPrice, editAvailability } = req.body
        const { filename } = req.file
        // const { title, category, description, price, availability } = req.body
        // const { filename } = req.file
        let updatedProduct = await ProductsModel.findByIdAndUpdate({_id : req.params.productId}, {$set : {productTitle : editTitle, productCategory : editCategory, productDescription : editDescription, productPrice : editPrice, productAvailability: editAvailability, productImage : filename}},{new : true})
        res.status(200).send({
            updatedProduct
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in editing product"
        })
    }
}

const deleteProduct = async(req,res) => {
    try {
        let deletedProduct = await ProductsModel.findByIdAndDelete({_id: req.params.id})
        res.status(200).send({
            message : "Product removed",
            deletedProduct
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in deleting product"
        })
    }
}

export default {
    addProduct,
    getAllProducts,
    getCurrentProductData,
    updateProduct,
    deleteProduct
}