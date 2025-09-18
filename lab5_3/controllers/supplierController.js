const Supplier = require('../models/Supplier');

exports.index = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.render('suppliers/index', { suppliers });
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi server khi lấy danh sách nhà cung cấp");
  }
};

exports.newForm = (req, res) => {
  res.render('suppliers/form', { supplier: {} });
};

exports.create = async (req, res) => {
  try {
    await Supplier.create(req.body);
    res.redirect('/suppliers');
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi server khi tạo nhà cung cấp");
  }
};

exports.editForm = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    res.render('suppliers/form', { supplier });
  } catch (err) {
    console.error(err);
    res.status(500).send("Không tìm thấy nhà cung cấp");
  }
};

exports.update = async (req, res) => {
  try {
    await Supplier.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/suppliers');
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi khi cập nhật nhà cung cấp");
  }
};

exports.delete = async (req, res) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.redirect('/suppliers');
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi khi xóa nhà cung cấp");
  }
};
