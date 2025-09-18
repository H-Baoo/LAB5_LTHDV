const Product = require("../models/product");
const Supplier = require("../models/supplier");

exports.getAllProducts = async (req, res) => {
  const products = await Product.find().populate("supplierId");
  res.render("products/index", { products });
};

exports.showAddForm = async (req, res) => {
  const suppliers = await Supplier.find();
  res.render("products/new", { suppliers });
};

exports.createProduct = async (req, res) => {
  await Product.create(req.body);
  res.redirect("/products");
};

exports.showEditForm = async (req, res) => {
  const product = await Product.findById(req.params.id);
  const suppliers = await Supplier.find();
  res.render("products/edit", { product, suppliers });
};

exports.updateProduct = async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/products");
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect("/products");
};
