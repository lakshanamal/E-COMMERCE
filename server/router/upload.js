const router = require("express").Router();
const cloudinary = require("cloudinary");
const express = require("express");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const env = require("dotenv");
const fs = require("fs");

cloudinary.config({
  cloud_name: "dtsfx4bxo",
  api_key: "356946675641672",
  api_secret: "aReRitaRfNQxtwbHI7mgqAmwS54",
});

router.post("/upload", (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length == 0)
      return res.status(400).json({ msg: "No files were uploaded" });
    const file = req.files.file;
    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: "Size too large" });
    }

    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: "File format is incorrect" });
    }

    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: "test" },
      (err, result) => {
        if (err) throw err;
        removeTmp(file.tempFilePath);
        res.json({ public_id: result.public_id, url: result.secure_url });
      }
    );
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

router.post("/destory", (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) return res.status(400).json({ msg: "No image select" });
    cloudinary.v2.uploader.destroy(public_id, (err, result) => {
      if (err) throw err;
      res.json({ msg: "Image Deleted" });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

module.exports = router;
