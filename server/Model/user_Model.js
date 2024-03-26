const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
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
        enum: ['superAdmin', 'owner', 'admin'],
        required: true
      }
},{timestamps:true});

userSchema.pre("save", async function (next) {
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
        next(error);
    }
});

userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            UserId: this._id.toString(),
            username: this.username,
            role: this.role,
        },
        process.env.JWT_SECRET_KEY),{
            expiresIn: "30d",
        }
    } catch (error) {
        console.log(error);
    }
}

userSchema.methods.changePassword = async function(currentPassword, newPassword) {
    try {
        const passwordMatch =  bcrypt.compare(currentPassword, this.password);

        if (!passwordMatch) {
            throw new Error("Incorrect current password");
        }

        const saltRound = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(newPassword, saltRound);
        this.password = hashedPassword;
        await this.save();
    } catch (error) {
        throw error;
    }
}
const User = new mongoose.model("User",userSchema ); 
module.exports = User;