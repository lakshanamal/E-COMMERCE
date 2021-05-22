const Category=require('../models/categoryModel')
const categoryCtr = {
  getCategories: async (req, res) => {
    try{
        const cate=await Category.findOne();
        res.json(cate);
    }catch(err){
        return res.status(500).json({msg:err.message})
    }
  },
  createCategory:async (req,res)=>{
      try{
        res.json("Create sucessfull");
      }catch(err){
        return res.status(500).json({msg:err.message})
      }
  }

};

module.exports = categoryCtr;
