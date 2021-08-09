const router = require('express').Router()
const controller=require('../controller/UserController')
const auth = require('../middleware/auth')
router.post('/register',controller.register)
router.post('/login',controller.login)
router.get('/logout',controller.logout)
router.get('/refresh_token',controller.refreshToken)
router.get('/info',auth,controller.getUser)
module.exports=router