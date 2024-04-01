const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventorySchema = new mongoose.Schema({
  // user: { type: Schema.Types.ObjectId, ref: 'User' },
  adminId: {
    type: String, 
    ref: 'Admin', 
    required: true,
  },
  medicines: [{
    medicineId: {
      type: String, 
      ref: 'Medicine',  
      required: true,
    },
    medicineID: {
      type: String,
      // required: true,
    },
    medicineName: {
      type: String,
      // required: true,
    },
    category: {
      type: String,
      // required: true,
    },
    unitPrice: {
      type: Number,
      // required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    place:{
      type: String,
      default: "No",
    },
  }],
  
},{timestamps: true});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
