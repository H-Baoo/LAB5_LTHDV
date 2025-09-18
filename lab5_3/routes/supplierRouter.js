const express = require('express');
const router = express.Router();
const supplierCtrl = require('../controllers/supplierController');
const { requireLogin } = require('../middleware/auth');

router.get('/', requireLogin, supplierCtrl.index);
router.get('/new', requireLogin, supplierCtrl.newForm);
router.post('/', requireLogin, supplierCtrl.create);
router.get('/:id/edit', requireLogin, supplierCtrl.editForm);
router.put('/:id', requireLogin, supplierCtrl.update);
router.delete('/:id', requireLogin, supplierCtrl.delete);

module.exports = router;
