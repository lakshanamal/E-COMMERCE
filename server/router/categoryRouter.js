const router=require('express').Router();
const auth=require('../middleware/auth');
const authAdmin=require('../middleware/authAdmin');
const categoryCtr=require('../controllers/categoryCtr');
  
router.route('/category')
        .get(categoryCtr.getCategories)
        .post(auth,authAdmin,categoryCtr.createCategory);

router.route('/category/:id')
        .delete(auth,authAdmin,categoryCtr.deleteCatogory)
        .update(auth,authAdmin,categoryCtr.updateCategory)
module.exports=router

