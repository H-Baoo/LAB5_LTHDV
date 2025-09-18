const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/productController');
const { requireLogin } = require('../middleware/auth');

// Danh sách sản phẩm + tìm kiếm + filter
router.get('/', productCtrl.index);

// Form tạo sản phẩm
router.get('/new', requireLogin, productCtrl.newForm);

// Tạo sản phẩm mới
router.post('/', requireLogin, productCtrl.create);

// Form sửa sản phẩm
router.get('/:id/edit', requireLogin, productCtrl.editForm);

// Cập nhật sản phẩm
router.put('/:id', requireLogin, productCtrl.update);

// Xóa sản phẩm
router.delete('/:id', requireLogin, productCtrl.delete);

module.exports = router;
