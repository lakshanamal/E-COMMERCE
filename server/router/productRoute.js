 const router=require('express').Router()
 const productCtr=require('../controllers/productCtr')

 router.route('/products')
        .get(productCtr.getProduct)
        .post(productCtr.createProduct)

router.route('/products/:id')
        .delete(productCtr.deleteProduct)
        .put(productCtr.updateProduct)

module.exports=router