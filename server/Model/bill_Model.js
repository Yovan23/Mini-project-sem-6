const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
    billId: {
        type: String,
        require: true,
        unique: true
    },
    customerName: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    medicines: [
      {
          medicineId: {
              type: mongoose.Schema.Types.ObjectId, 
              ref: 'Medicine', 
          },
          medicineId: {type: String},
          medicineName: { type: String },
          category: {type: String},
          quantity: { type: Number },
          unitPrice: { type: Number },
          subTotal: { type: Number, default: 0 },
      }
  ],
    totalAmount: { 
      type: Number, 
      default: 0 
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin'
  }
  },{timestamps:true});


  billSchema.pre("save", async function (next) {
    const uniqueBillId = generateUniqueBillId();
    this.billId = uniqueBillId;
    next();
});

  function generateUniqueBillId() {
    const randomId = Math.floor(Math.random() * 90000) + 10000; 
    return randomId.toString();
}


const Bill = new mongoose.model("Bill",billSchema ); 
module.exports = Bill;

