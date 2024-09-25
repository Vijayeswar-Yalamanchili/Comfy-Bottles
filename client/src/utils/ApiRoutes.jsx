const ApiRoutes = {
    LOGIN : {
        path : '/users/login',
        authenticate : false
    },
    REGISTER : {
        path : '/users/register',
        authenticate : false
    },
    FORGOTPASSWORD : {
        path : '/users/forgotpassword',
        authenticate : false
    },
    LOGOUT : {
        path : '/users/logout',
        authenticate : true
    },
    CURRENTUSER : {
        path : '/users/currentuser',
        authenticate : true
    },
    USERPROFILEUPDATE : {
        path : '/users/profileupdate',
        authenticate : true
    },
    //product
    ADDPRODUCT : {
        path : '/product/addproduct',
        authenticate : true
    },
    GETALLPRODUCTS : {
        path : '/product/allproducts',
        authenticate : true
    },
    EDITPRODUCT : {
        path : '/product/updateproduct',
        authenticate : true
    },
    DELETEPRODUCT : {
        path : '/product/deleteproduct',
        authenticate : true
    },
    CURRENTPRODUCTDATA : {
        path : '/product/currentproductdata',
        authenticate : true
    },
    ADDCARTLIST : {
        path : '/product/addcart',
        authenticate : true
    },
    REMOVECARTLIST : {
        path : '/product/removecart',
        authenticate : true
    },
}

export default ApiRoutes