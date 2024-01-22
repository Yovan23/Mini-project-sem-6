const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
    medicineId: { 
        type: String, 
        required: true,
        unique: true 
    },
    medicineName: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String, 
        required: true 
    },
    unitPrice: { 
        type: Number, 
        required: true 
    },
    stockQuantity: { 
        type: Number, 
        required: true 
    },
    expiryDate: { 
        type: Date,
        required: true  
    },
});


const Medicine = new mongoose.model("Medicine",medicineSchema ); 
module.exports = Medicine;