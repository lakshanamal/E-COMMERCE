const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { registerAuth } = require("./validation");
const jwt = require("jsonwebtoken");

const userCtr = {
  register: async (req, res) => {
    console.log(req.body.email);
    const existsUser = await User.findOne({ email: req.body.email });
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
      // // const savedUser = await User.deleteMany({});

      const accessToken = crateAcessToken({ id: savedUser._id });
      const refreshToken = createRefreshToken({ id: savedUser._id });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        // path: "/user/refreshtoken",
      });

      res.json({ meg: "accessToken" });
      // console.log({ accessToken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refreshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshToken;
      
      if (!rf_token)
        return res.status(400).json({ msg: "Please login or register" }); // check the brower has cookies
      jwt.verify(rf_token, process.env.REFRESH, (err, user) => {
        if (err)
          return res.status(400).json({ msg: "Please logine or register" }); // compare with brower cookies and server cookies
        const acessToken = createAcessToken({ id: user.id });
        res.json({ user, acessToken });
      });
    } catch (error) {
      res.status(500).json({ meg: error.message });
    }
    const rf_token = req.cookies.refreshToken;
    res.json({ rf_token });
  },
};

const createAcessToken = (id) => {
  return jwt.sign(id, process.env.ACESS_TOKEN, { expiresIn: "1d" });
};

const createRefreshToken = (id) => {
  return jwt.sign(id, process.env.REFRESH, { expiresIn: "7d" });
};

module.exports = userCtr;
