const Product=require('../models/productModel')

const productCtrl={
    getProduct:async (req,res)=>{
        try{
            const products=await Product.find();
            res.json(products)
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    createProduct:async (req,res)=>{
        try{

        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    deleteProduct:async (req,res)=>{
        try{

        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    updateProduct:async (req,res)=>{
        try{

        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
}

module.exports=productCtrl