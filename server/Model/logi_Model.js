const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the User schema
const logiSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['superadmin', 'franchiseOwner', 'admin'],
    required: true
  },
//   franchiseDetails: {
//     type: Schema.Types.Mixed,
//     // Only required for franchise owners
//     required: function() {
//       return this.role === 'franchiseOwner';
//     }
//   },
  // Add any other fields you need for the user model
}, {
  timestamps: true
});

const Logi = mongoose.model('Logi', logiSchema);

module.exports = Logi;
