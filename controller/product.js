const Product = require("../model/product");

const { StatusCodes } = require("http-status-codes/build/cjs/status-codes");
const cryptoJS = require("crypto-js");

//CREATE NEW PRODUCT
exports.createNewProduct = async (req, res) => {
  const product = Product(req.body);

  try {
    const newProduct = await product.save();
    res.status(StatusCodes.OK).json(newProduct);
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json(err);
  }
};

//GET ALL PRODUCTS
exports.getAllProducts = async (req, res) => {
  const qNew = req.query.new;
  const qcategory = req.query.category;

  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qcategory) {
      products = await Product.find({
        categories: {
          $in: [qcategory],
        },
      });
    } else {
      products = await Product.find();
    }
    res.status(StatusCodes.OK).json({
      status: "success",
      product_nums: products.length,
      message: products,
    });
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json(err);
  }
};

//UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(StatusCodes.OK).json(updatedProduct);
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json(err);
  }
};

//DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.ACCEPTED).json("deleted successfully!");
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json(err);
  }
};

//GET ONE PRODUCT
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.status(StatusCodes.OK).json(product);
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json(err);
  }
};
