const Product = require("../models/productModel");

class APIfeature {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObj = { ...this.queryString };
    const excludedFeild = ["page", "sort", "limit"];
    excludedFeild.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match // conatination with $
    );
    this.query.find(JSON.parse(queryStr)); // search database
    return this;
  }
  sorting() {
      if(this.queryString.sort){
        const sortBy=this.queryString.sort.split(',').join(' ');
        this.query=this.query.sort(sortBy);
      }else{
          this.query=this.query.sort('-createAt')   // this is default sort by method for based on created time
      }
      return this;   
  }
  paginating() {}
}
const productCtrl = {
  getProduct: async (req, res) => {
    try {
      const features = new APIfeature(Product.find(), req.query).filtering().sorting();
      const products = await features.query; //member of APIfeature class
      //   const products=await Product.find();
      res.json(products);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        discription,
        content,
        images,
        category,
      } = req.body;
      if (!images) return res.status(400).json({ msg: "No image uplaoded" });
      const checkProduct = await Product.findOne({ product_id });
      if (checkProduct)
        return res.status(400).json({ msg: "No image uplaoded" });

      const newProduct = new Product({
        product_id,
        title: title.toLowerCase(),
        price,
        discription,
        content,
        images,
        category,
      });
      await newProduct.save();

      res.json({ msg: "new Product added sucessfull" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.paras.id);
      res.json({ msg: "Product deleted" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { title, price, discription, content, images, category } = req.body;
      if (!images) return res.status(400).json({ msg: "Image not uploaded" });

      await Product.findByIdAndUpdate(
        { _id: req.params.id },
        {
          title: title.toLowerCase(),
          price,
          discription,
          content,
          images,
          category,
        }
      );

      res.json({ msg: "Updated a product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = productCtrl;
