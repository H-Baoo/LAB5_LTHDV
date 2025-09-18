const Supplier = require("../models/supplier");

exports.getAllSuppliers = async (req, res) => {
  const suppliers = await Supplier.find();
  res.render("suppliers/index", { suppliers });
};

exports.showAddForm = (req, res) => {
  res.render("suppliers/new");
};

exports.createSupplier = async (req, res) => {
  await Supplier.create(req.body);
  res.redirect("/suppliers");
};

exports.showEditForm = async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  res.render("suppliers/edit", { supplier });
};

exports.updateSupplier = async (req, res) => {
  await Supplier.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/suppliers");
};

exports.deleteSupplier = async (req, res) => {
  await Supplier.findByIdAndDelete(req.params.id);
  res.redirect("/suppliers");
};
