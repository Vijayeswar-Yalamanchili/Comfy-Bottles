import mongoose from "./indexModel.js"

const productSchema = new mongoose.Schema({
    productTitle : {
        type : String,
        required : true
    },
    productCategory : {
        type : String,
        required : true
    },
    productDescription : {
        type : String,
        required : true
    },
    productPrice : {
        type : Number,
        required : true
    },
    productAvailability : {
        default : 0,
        type : Number,
    },
    productImage : {
        type : String,
        required : true
    },
    isStockAvailable : {
        type : Boolean,
        default : true
    }
},
{ timestamps : true },
{ collection : 'products'})

const ProductsModel = mongoose.model("products",productSchema)

export default ProductsModel