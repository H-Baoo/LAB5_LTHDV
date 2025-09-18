const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: Number,
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' } // 👈 rất quan trọng
});

module.exports = mongoose.model('Product', productSchema);
