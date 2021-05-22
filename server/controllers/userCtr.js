const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const userCtr = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body; // object distraction
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
      });
      const savedUser=await newUser.save();
      return res.json(savedUser);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = userCtr;
