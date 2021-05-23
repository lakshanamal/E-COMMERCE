const Category = require("../models/categoryModel");
const categoryCtr = {
  getCategories: async (req, res) => {
    try {
      const cate = await Category.find();
      res.json(cate);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const checkCategory = await Category.findOne({ name });
      if (checkCategory)
        return res.status(400).json({ msg: "Product alreaty exists" });

      const newProduct = new Category({ name });
      await newProduct.save();

      res.json("Create sucessfull");
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteCatogory: async (req, res) => {
    try {
      const checkProduct = await Category.findByIdAndDelete(req.param.id);
      res.json({ msg: "Product delete sucessfull" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const updateProduct=await Category.findOneAndUpdate({ _id: req.params.id }, { name });
      res.json("Update sucessfull");
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = categoryCtr;
