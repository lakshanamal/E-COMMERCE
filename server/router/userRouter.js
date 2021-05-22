const  router=require('express').Router();
const userCtr=require('../controllers/userCtr');

router.post('/register',userCtr.register);
router.post('/login',userCtr.login);
router.get('/refreshToken',userCtr.refreshToken);
 
module.exports=router;