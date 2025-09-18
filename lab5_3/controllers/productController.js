const Product = require('../models/Product');
const Supplier = require('../models/Supplier');



exports.index = async (req, res) => {
  try {
    const { q, supplier } = req.query;
    const filter = {};
    if (q) filter.name = new RegExp(q, 'i');
    if (supplier) filter.supplier = supplier;

    const products = await Product.find(filter).populate('supplier');
    const suppliers = await Supplier.find();

    res.render('products/index', { 
      products, 
      suppliers, 
      q, 
      supplier 
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi server khi lấy danh sách sản phẩm");
  }
};

exports.newForm = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.render('products/form', { product: {}, suppliers });
  } catch (err) {
    console.error(err);
    res.status(500).send("Không thể load form tạo sản phẩm");
  }
};

exports.create = async (req, res) => {
  try {
    await Product.create(req.body);
    res.redirect('/products');
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi khi tạo sản phẩm");
  }
};

exports.editForm = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const suppliers = await Supplier.find();
    res.render('products/form', { product, suppliers });
  } catch (err) {
    console.error(err);
    res.status(500).send("Không tìm thấy sản phẩm");
  }
};

exports.update = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/products');
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi khi cập nhật sản phẩm");
  }
};

exports.delete = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi khi xóa sản phẩm");
  }
};
