const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventorySchema = new mongoose.Schema({
  // user: { type: Schema.Types.ObjectId, ref: 'User' },
  inventoryId: {
    type: String,
    required: true,
    // unique: true,    
  },
 
  adminId: {
    type: Schema.Types.ObjectId, 
    ref: 'Admin', 
    required: true,
  },
  medicines: [{
    medicineId: {
      type: String, 
      ref: 'Medicine',  
      required: true,
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
    quantity: {
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
