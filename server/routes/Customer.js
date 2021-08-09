const router = require('express').Router()
const controller=require('../controller/CustomerController')
const auth = require('../middleware/auth')

router.post('/add',controller.addCustomer)

router.put('/:id',controller.updateCustomer)

router.delete('/:id',controller.deleteCustomer)

router.get('/get',controller.getCustomer)
module.exports=router