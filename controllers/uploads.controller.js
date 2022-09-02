const { response } = require("express");
const { uploadFile } = require("../helpers");
const Product = require("../models/product");
const User = require("../models/user");
const path = require("path");
const fs = require("fs");

const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const loadFile = async (req, res = response) => {
  try {
    const fileToUpload = await uploadFile(req.files, undefined, "Images");
    res.json({ msg: fileToUpload });
  } catch (error) {
    res.json({ error });
  }
};

const uptadeImage = async (req, res = response) => {
  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);

      if (!model) {
        return res
          .status(400)
          .json({ msg: `The user with the ID ${id} does not exist` });
      }
      break;

    case "products":
      model = await Product.findById(id);

      if (!model) {
        return res
          .status(400)
          .json({ msg: `The product with the ID ${id} does not exist` });
      }
      break;

    default:
      return res.status(500).json({ msg: "Back end error" });
  }

  // Clean images

  if (model.image) {
    const imagePath = path.join(
      __dirname,
      "../uploads",
      collection,
      model.image
    );

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  const name = await uploadFile(req.files, undefined, collection);

  model.image = name;

  await model.save();

  res.json(model);
};

const uptadeImageCloudinary = async (req, res = response) => {
  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);

      if (!model) {
        return res
          .status(400)
          .json({ msg: `The user with the ID ${id} does not exist` });
      }
      break;

    case "products":
      model = await Product.findById(id);

      if (!model) {
        return res
          .status(400)
          .json({ msg: `The product with the ID ${id} does not exist` });
      }
      break;

    default:
      return res.status(500).json({ msg: "Back end error" });
  }

  // Clean images

  if (model.image) {
    const nameArr = model.image.split("/");
    const nameImage = nameArr[nameArr.length - 1];
    const [public_id] = nameImage.split(".");

    cloudinary.uploader.destroy(public_id);
  }

  const { tempFilePath } = req.files.file;

  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

  const name = secure_url;

  model.image = name;

  await model.save();

  res.json(model);
};

const getImage = async (req, res = response) => {
  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);

      if (!model) {
        return res
          .status(400)
          .json({ msg: `The user with the ID ${id} does not exist` });
      }
      break;

    case "products":
      model = await Product.findById(id);

      if (!model) {
        return res
          .status(400)
          .json({ msg: `The product with the ID ${id} does not exist` });
      }
      break;

    default:
      return res.status(500).json({ msg: "Back end error" });
  }

  if (model.image) {
    const imagePath = path.join(
      __dirname,
      "../uploads",
      collection,
      model.image
    );

    if (fs.existsSync(imagePath)) {
      return res.sendFile(imagePath);
    }
  }

  const noImagePath = path.join(__dirname, "../assests", "no-image.jpg");

  res.sendFile(noImagePath);
};
module.exports = { loadFile, uptadeImage, getImage, uptadeImageCloudinary };
