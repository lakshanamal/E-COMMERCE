const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser=require('cookie-parser');

dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use("/user", require("./router/userRouter"));

mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.listen(3001, () => {
  console.log("Server listing port 3001");
});
