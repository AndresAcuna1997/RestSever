const { response, request } = require("express");

const { Product } = require("../models");

const getAllProducts = async (req = request, res = response) => {
  try {
    const { limit = 5, from = 0 } = req.query;
    const query = { state: true };

    const totalEntries = new Promise((resolve, reject) => {
      const countTotal = Product.countDocuments(query);

      if (countTotal) {
        resolve(countTotal);
      } else {
        reject("Could not get the total count");
      }
    });

    const categoryPromise = new Promise((resolve, reject) => {
      const categoryData = Product.find(query)
        .populate("user", "name")
        .skip(from)
        .limit(limit);

      if (categoryData) {
        resolve(categoryData);
      } else {
        reject("Could not get the products");
      }
    });

    const [total, products] = await Promise.all([
      totalEntries,
      categoryPromise,
    ]);

    res.json({ ok: true, data: { total, products } });
  } catch (error) {
    console.log(error);
  }
};

const getProductById = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
};

const createProduct = async (req = request, res = response) => {
  try {
    const { name, ...body } = req.body;

    const upperName = name.toUpperCase();

    const data = { ...body, name: upperName, user: req.userVerified._id };

    const product = new Product(data);

    await product.save();

    console.log(product);
    res.status(201).json({ ok: true, product });
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(
      id,
      { state: false },
      { new: true }
    );

    res.status(200).json({ product });
  } catch (error) {
    console.log(error);
  }
};

const modifyProduct = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const { state, user, ...data } = req.body;

    const product = await Product.findByIdAndUpdate(id, data, { new: true });

    res.status(200).json({ product });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  modifyProduct,
};
