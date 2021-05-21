const  router=require('express').Router();
const userCtr=require('../controllers/userCtr');

router.post('/register',userCtr.register)

module.exports=router;