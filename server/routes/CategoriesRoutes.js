const category =require('../controller/CategoriesController')
const router =require('express').Router()
router.get('/',category.get)
router.post('/',category.add)
router.delete('/:id',category.delete)
router.put('/:id',category.update)
module.exports=router