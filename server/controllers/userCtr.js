const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { registerAuth } = require("./validation");
const userCtr = {
  register: async (req, res) => {
    const existsUser = User.findOne({ email: req.body.email });
    if (existsUser) return res.status(400).json({ msg: "Email alreay exites" });
    
    const { error } = registerAuth(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    try {
      const { name, email, password } = req.body; // object distraction
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        name: name,
        email: email,
        password: hashPassword,
      });
      const savedUser = await newUser.save();
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = userCtr;
