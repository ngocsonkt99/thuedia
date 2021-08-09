const router = require('express').Router()
const controller=require('../controller/DiskController')
const auth = require('../middleware/auth')

router.post('/add',controller.addDisk)

router.put('/:id',controller.updateDisk)

router.delete('/:id',controller.deleteDisk)

router.get('/get',controller.getDisk)

module.exports=router