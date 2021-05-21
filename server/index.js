const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
app.use(express.json());

mongoose.connect(
  "mongodb+srv://lakshan:lakshan@cluster0.ja8ud.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);
app.listen(3001, () => {
  console.log("Server listing port 3001");
});
