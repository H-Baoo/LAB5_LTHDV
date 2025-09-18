const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supplierController");

router.get("/", supplierController.getAllSuppliers);
router.get("/new", supplierController.showAddForm);
router.post("/", supplierController.createSupplier);
router.get("/:id/edit", supplierController.showEditForm);
router.post("/:id", supplierController.updateSupplier);
router.get("/:id/delete", supplierController.deleteSupplier);

module.exports = router;
