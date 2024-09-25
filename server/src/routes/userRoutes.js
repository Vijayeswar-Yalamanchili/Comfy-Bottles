import express from 'express'
import auth from '../helper/auth.js'
import userAuthController from '../controller/userAuthController.js'
import userController from '../controller/userController.js'

const router = express.Router()

//auth
router.post('/login',userAuthController.login)
router.post('/register',userAuthController.register)
router.post('/forgotpassword',userAuthController.forgotPassword)
router.put('/logout/:id',userAuthController.logout)

//user
router.get('/currentuser/:id', auth.authenticate,userController.currentUserData)
router.put('/profileupdate/:id', auth.authenticate,userController.userprofileUpdate)

export default router