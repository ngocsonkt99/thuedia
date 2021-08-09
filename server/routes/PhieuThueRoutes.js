const router = require('express').Router()
const controller=require('../controller/PhieuThueController')


router.post('/add',controller.addPhieuThue)

router.put('/:id',controller.updatePhieuThue)

router.delete('/:id',controller.deletePhieuThue)

router.get('/get',controller.getPhieuThue)

module.exports=router