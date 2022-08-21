const { response, request } = require("express");

const Category = require("../models/category");

const createCategory = async (req = request, res = response) => {
  try {
    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({ name });

    if (categoryDB) {
      return res
        .status(400)
        .json({ msg: `The category ${categoryDB.name} already exist` });
    }

    const data = {
      name,
      user: req.userVerified._id,
    };

    const category = new Category(data);

    await category.save();

    res.status(201).json(category);
  } catch (error) {
    console.log(error);
  }
};

const getAllCategories = async (req = request, res = response) => {
  const { limit = 10, from = 0 } = req.query;

  const query = { state: true };

  const totalEntries = new Promise((resolve, reject) => {
    const countTotal = Category.countDocuments(query);

    if (countTotal) {
      resolve(countTotal);
    } else {
      reject("Could not get the total count");
    }
  });

  const categoriesPromise = new Promise((resolve, reject) => {
    const data = Category.find(query)
      .populate("user", "name")
      .skip(from)
      .limit(limit);

    if (data) {
      resolve(data);
    } else {
      reject("Could not get the users");
    }
  });

  const [total, data] = await Promise.all([totalEntries, categoriesPromise]);

  res.json({ ok: true, data: { total, data } });
};

const getCategoryById = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category || !category.state) {
      return res
        .status(404)
        .json({ msg: `The category with the ID ${id} was not found` });
    }

    res.json(category);
  } catch (error) {
    console.log(error);
  }
};

const deleteCategory = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndUpdate(
      id,
      { state: false },
      { new: true }
    );

    if (!category) {
      return res
        .status(404)
        .json({ msg: `The category with the ID ${id} was not found` });
    }

    res.json(category);
  } catch (error) {
    console.log(error);
  }
};

const putCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const { state, user, ...data } = req.body;

  data.name = data.name.toUpperCase();
  data.user = req.userVerified._id;

  const categoryUpdated = await Category.findByIdAndUpdate(id, data, {
    new: true,
  });

  res.json({ categoryUpdated });
};

module.exports = {
  createCategory,
  getCategoryById,
  deleteCategory,
  getAllCategories,
  putCategory,
};
