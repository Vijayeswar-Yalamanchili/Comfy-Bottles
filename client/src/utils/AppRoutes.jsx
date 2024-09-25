import React,{ lazy,Suspense } from "react"
import Loading from '../components/loadingComponent/LoadingComponent'

const HomePage = lazy(()=> import('../pages/navs/home/Home'))
const LoginPage = lazy(()=> import('../pages/auths/Login'))
const RegisterPage = lazy(()=> import('../pages/auths/Register'))
const ForgotPasswordPage = lazy(()=> import('../pages/auths/ForgotPassword'))
const ProductsListPage = lazy(()=> import('../pages/navs/productsList/ProductsList'))
const MyAccountPage = lazy(()=> import('../pages/navs/myAccount/MyAccount'))
const CartPage = lazy(()=> import('../pages/navs/cart/Cart'))
const ErrorPage = lazy(()=> import('../components/errorScreen/ErrorScreen'))

const AppRoutes = [
    {
        path : '/',
        element : <Suspense fallback={<Loading/>}><HomePage/></Suspense>
    },
    {
        path : '/login',
        element : <Suspense fallback={<Loading/>}><LoginPage/></Suspense>
    },
    {
        path : '/register',
        element : <Suspense fallback={<Loading/>}><RegisterPage/></Suspense>
    },
    {
        path : '/forgotpassword',
        element : <Suspense fallback={<Loading/>}><ForgotPasswordPage/></Suspense>
    },
    {
        path : '/productslist',
        element : <Suspense fallback={<Loading/>}><ProductsListPage/></Suspense>
    },
    {
        path : '/myaccount',
        element : <Suspense fallback={<Loading/>}><MyAccountPage/></Suspense>
    },
    {
        path : '/cart',
        element : <Suspense fallback={<Loading/>}><CartPage/></Suspense>
    },
    {
        path : '*',
        element : <Suspense fallback={<Loading/>}><ErrorPage/></Suspense>
    }
]

export default AppRoutes