const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require('./admin_Model');

const ownerSchema = new mongoose.Schema({
    ownerId: { 
        type: String, 
        required: true,
        unique: true 
    },
    username: {
        type: String,
        require: true,
        unique: true 
    },
    cityName: { 
        type: String, 
        required: true 
    },
    phoneNo: { 
        type: Number, 
        required: true,
        unique: true , 
    },
    email: { 
        type: String, 
        required: true,
        unique: true , 
    },
    AdminsNoOf: { 
        type: Number, 
        default: 0,
    },
    password: { 
        type: String, 
        required: true,
    },
    role: {
        type: String,
        default: "owner",
    },
},{timestamps: true});

ownerSchema.pre("save", async function (next) {
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
ownerSchema.statics.aggregateWithAdminsAndUpdate = async function () {
    try {
        const pipeline = [
            {
                $lookup: {
                    from: "admins",
                    localField: "username",
                    foreignField: "owner",
                    as: "Adminsno"
                }
            },
            {
                $addFields: {
                    AdminsNoOf: {
                        $size: "$Adminsno"
                    }
                }
            },
            {
                $project: {
                    AdminsNoOf: 1,
                    ownerId: 1,
                    username: 1,
                    cityName: 1,
                    phoneNo: 1,
                    email: 1,
                    password: 1,
                    role: 1,
                    createdAt: 1,
                    updatedAt: 1,
                }
            }
        ];

        return await this.aggregate(pipeline);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

ownerSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password);
}
ownerSchema.methods.generateToken = async function () {
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

const Owner = new mongoose.model("Owner",ownerSchema ); 
module.exports = Owner;