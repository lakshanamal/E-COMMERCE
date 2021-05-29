const Payment = require("../models/paymentModel");
const User = require("../models/userModel");
const Products = require("../models/productModel");

const paymentCtr = {
  getPayment: async (req, res) => {
    try {
      const payment = await Payment.find();
      res.json(payment);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createPayment: async (req, res) => {
    try {
      const user =await  User.findById(req.user.id).select('name email');
      if (!user) return res.json({ msg: "User does not exists" });
    
      const { cart, paymentID, address } = req.body;
      const { _id, name, email } = user;

      const newPayment = new Payment({
        user_id: _id,
        name,
        email,
        cart,
        paymentID,
        address,
      });
    //   console.log({ newPayment });
    cart.filter(item=>{
      return sold(item._id,item.quantity,item.sold)
    })
      await newPayment.save()
     res.json({newPayment})
      
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    //   console.log(err.message)
    }
  },
};

const sold=async(id,quantity,oldSold)=>{
  await Products.findOneAndUpdate({_id:id},{
    sold:quatity+oldSold
  })
}
module.exports = paymentCtr;
