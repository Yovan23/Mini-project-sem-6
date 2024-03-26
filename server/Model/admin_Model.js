const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Owner = require('./owner_Model');

const adminSchema = new mongoose.Schema({
    adminId: { 
        type: String, 
        required: true,
        unique: true 
    },
    username: {
        type: String,
        require: true,
        unique: true,
    },
    cityName: { 
        type: String, 
        required: true 
    },
    location: { 
        type: String, 
        required: true, 
    },
    phoneNo: { 
        type: Number, 
        required: true,
        unique: true,
    },
    email: { 
        type: String, 
        required: true,
        unique: true  
    },
    owner: { 
        type: String, 
        required: true,
    },
    password: { 
        type: String, 
        required: true,
    },
    role: {
        type: String,
        default: "admin",
    }
},{timestamps: true});

adminSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified("password")) {
        return next();
    }

    try {
        const saltRound = await bcrypt.genSalt(8);
        const hash_password =  await bcrypt.hash(user.password, saltRound); 
        user.password = hash_password;
        next();
    } catch (error) {
        console.log(error);
    }
});

adminSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password);
}

adminSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            UserId: this._id.toString(),
            username: this.username,
            role: this.role,
        },
        process.env.JWT_SECRET_KEY)
    } catch (error) {
        console.log(error);
    }
}



// Middleware to update noOfAdmin when a new admin is added
adminSchema.post('save', async function (doc, next) {
    try {
        const admin = doc; // Refer to the current admin document
        // Find the corresponding owner and update noOfAdmin if owner exists
        console.log("add");
        const owner = await Owner.findOne({ username: admin.owner });
        if (owner) {
            const adminCount = await Admin.countDocuments({ owner: admin.owner });
            owner.noOfAdmin = adminCount;
            await owner.save();
        }
    } catch (error) {
        console.error("Error updating noOfAdmin:", error);
    }

    next(); // Allow save operation to proceed after middleware logic
});

// Post-remove middleware to update noOfAdmin when an admin is deleted
// Post-remove middleware to update noOfAdmin when an admin is deleted
adminSchema.post('remove', async function (doc, next) {
    try {
        // Access the owner's username directly from the deleted admin document
        const ownerUsername = doc.owner;
  console.log("hey");
        const owner = await Owner.findOne({ username: ownerUsername });
  
        if (owner) {
            owner.noOfAdmin -= 1;
            await owner.save();
        }
    } catch (error) {
        console.error("Error updating noOfAdmin:", error);
    }

    next(); 
});

const Admin = new mongoose.model("Admin",adminSchema ); 
module.exports = Admin;