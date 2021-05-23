const router = require("express").Router();
const cloudinary = require("cloudinary");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  COUDINARY_API_KEY:  process.env.COUDINARY_API_KEY,
  api_key:  process.env.CLOUDNARY_SECRET,
});

router.post('/upload',(req,res)=>{
    try{
        console.log( req.files);
        res.json('text upload')
    }catch(err){
        return res.status(500).json({msg:err.message})
    }
})

module.exports=router ;
