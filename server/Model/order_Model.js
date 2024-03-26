const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  medicineId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medicine', 
    required: true,
  },
  medicineName: {
    type: String,
  },
  unitPrice: {
    type: Number,
  },
  quantity: {
    type: Number,
    // required: true,
    min: 1,
  },
  subTotal: {
    type: Number,
    default: 0,
  },
});

const orderSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin', 
    required: true,
  },
  orderItems: [orderItemSchema],
  totalAmount: {
    type: Number,
    default: 0,
  },
},{timestamps:true});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
