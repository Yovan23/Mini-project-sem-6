// const mongoose = require('mongoose');

// const orderItemSchema = new mongoose.Schema({
//   medicineId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Medicine', 
//     required: true,
//   },
//   medicineName: {
//     type: String,
//   },
//   unitPrice: {
//     type: Number,
//   },
//   quantity: {
//     type: Number,
//     // required: true,
//     min: 1,
//   },
//   subTotal: {
//     type: Number,
//     default: 0,
//   },
// });

// const orderSchema = new mongoose.Schema({
  // adminId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Admin', 
  //   required: true,
  // },
//   orderItems: [orderItemSchema],
//   totalAmount: {
//     type: Number,
//     default: 0,
//   },
// },{timestamps:true});

// const Order = mongoose.model('Order', orderSchema);

// module.exports = Order;
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  medicineId: {
    type: String,
  },
  medicineName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  category: {
    type: String,
  },
  subTotal: {
    type: Number,
    default: 0,
  },
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: String, 
    required: true,
  },
  Username: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  orderItems: [orderItemSchema],
  totalAmount: {
    type: Number,
    default: 0,
  },
  ownerStatus: {
    type: String,
    enum: ['Pending', 'Approved', 'Denied'],
    default: 'Pending',
  },
  superAdminStatus: {
    type: String,
    default: 'Pending',
  },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
