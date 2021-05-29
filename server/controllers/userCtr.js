const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { registerAuth } = require("./validation");
const jwt = require("jsonwebtoken");

const userCtr = {
  register: async (req, res) => {
    const { error } = registerAuth(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const existsUser = await User.findOne({ email: req.body.email });
    if (existsUser) return res.status(400).json({ msg: "Email alreay exites" });

    try {
      const { name, email, password } = req.body; // object distraction
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        name: name,
        email: email,
        password: hashPassword,
      });
      await newUser.save();
      // const savedUser = await User.deleteMany({});

      const accessToken = createAcessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({ id: newUser._id });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
      });

      // res.json({ meg: "Register sucess" });
      res.json({ accessToken });
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
        res.json({ acessToken });
      });
    } catch (error) {
      res.status(500).json({ meg: error.message });
    }
  },
  login: async (req, res) => {
    // const {error}=loginAuth(req.body);
    // if(error) return res.status(400).json(error.details[0].message);

    try {
      const { email, password } = req.body;
      const checkUser = await User.findOne({ email }); // find user base on email so there is user
      if (!checkUser) return res.status(400).json("Email dosn't exists");

      const checkPassword = await bcrypt.compare(password, checkUser.password);
      if (!checkPassword) return res.status(400).json("Password is wrong");

      const acessToken = createAcessToken({ id: checkUser._id });
      const refreshToken = createRefreshToken({ id: checkUser._id });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        // path:  `/user/refresh_token`,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.json({ acessToken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: (req, res) => {
    try {
      res.clearCookie("refreshToken");
      return res.json({ msg: "Logged out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      if (!user) return res.status(400).json({ msg: "user doesnt exists" });
      res.json(user);
      // console.log(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  addCart: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) return res.status(400).json({ msg: "User does not exits" });

      await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          cart: req.body.cart,
        }
      );

      return res.json({ msg: "Added to cart" });
      // return res.json(req.body.cart);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

const createAcessToken = (id) => {
  return jwt.sign(id, process.env.ACESS_TOKEN, { expiresIn: "11m" });
};

const createRefreshToken = (id) => {
  return jwt.sign(id, process.env.REFRESH, { expiresIn: "7d" });
};

module.exports = userCtr;
