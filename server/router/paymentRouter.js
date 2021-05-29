const router=require('express').Router()
const paymentCtr=require('../controllers/paymentCtr')
const auth=require('../middleware/auth')
const adminAuth=require('../middleware/authAdmin')

router.route('/payment')
    .get(auth,adminAuth,paymentCtr.getPayment)
    .post(auth,paymentCtr.createPayment)


module.exports=router;