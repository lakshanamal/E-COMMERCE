const  router=require('express').Router();
const userCtr=require('../controllers/userCtr');
const auth=require('../middleware/auth');

router.post('/register',userCtr.register);
router.post('/login',userCtr.login);
router.get('/logout',userCtr.logout);
router.get('/refreshToken',userCtr.refreshToken);
router.get('/infor',auth,userCtr.getUser);
 
module.exports=router;