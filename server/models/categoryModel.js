const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  NAME: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  timestamps: true,
});

module.exports = mongoose.model("category", categorySchema);
