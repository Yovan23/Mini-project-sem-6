const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
    },
    password:{
        type: String,
        require: true,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
});

userSchema.pre("save",async function(){
    const user = this;

    if(!user.isModified("password")){
        next();
    }
    try {
        
        const saltRound = await bcrypt.genSalt(8);
        const hash_password = await bcrypt.hash(user.password,saltRound);
        user.password = hash_password;
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
            isAdmin: this.isAdmin,
        },
        process.env.JWT_SECRET_KEY)
    } catch (error) {
        console.log(error);
    }
}

const User = new mongoose.model("User",userSchema ); 
module.exports = User;