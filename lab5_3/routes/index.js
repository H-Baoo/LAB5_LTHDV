const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

router.get('/', async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    // Hiển thị trang chính: list products + filter theo supplier + search
    res.render('index', { 
      title: "Trang chủ quản lý sản phẩm", 
      suppliers 
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi server");
  }
});

module.exports = router;
