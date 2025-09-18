const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.getAllProducts);
router.get("/new", productController.showAddForm);
router.post("/", productController.createProduct);
router.get("/:id/edit", productController.showEditForm);
router.post("/:id", productController.updateProduct);
router.get("/:id/delete", productController.deleteProduct);

module.exports = router;
