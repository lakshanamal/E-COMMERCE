const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");

dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use(
  fileUpload({
    useTempFiles: true,
  })
);
// route
app.use("/user", require("./router/userRouter"));
app.use("/api", require("./router/categoryRouter"));
app.use("/api", require("./router/upload"));
app.use("/api", require("./router/productRoute"));
app.use("/api", require("./router/paymentRouter"));

mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(3001, () => {
  console.log("Server listing port 3001");
});
