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
      const savedUser = await newUser.save();
      // const savedUser = await User.deleteMany({});

      const accessToken = createAcessToken({ id: savedUser._id });
      const refreshToken = createRefreshToken({ id: savedUser._id });

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
      if (!checkPassword)
        return res.status(400).json({ msg: "Password is wrong" });

      const acessToken = createAcessToken({ id: checkUser._id });
      const refreshToken = createRefreshToken({ id: checkUser._id });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
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
      const user = await User.findById(req.user.id).select('-password');
      if (!user) return res.status(400).json({ msg: "user doesnt exists" });
      res.json(user);
    } catch (err) {
      return res.status(500).json({msg:err.message});
    }
  },
};

const createAcessToken = (id) => {
  return jwt.sign(id, process.env.ACESS_TOKEN, { expiresIn: "1d" });
};

const createRefreshToken = (id) => {
  return jwt.sign(id, process.env.REFRESH, { expiresIn: "7d" });
};

module.exports = userCtr;
