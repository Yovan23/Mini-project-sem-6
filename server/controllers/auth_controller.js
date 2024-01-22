
const User = require("../Model/user_Model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



const home = async (req,res) => {
    try {
        res
        .status(200)
        .send("hey..");
    } catch (error) {
       next(error);
    }
}

const register = async (req,res) => {
    try {
        console.log(req.body);
        const { username, password} = req.body;
        const userExist = await User.findOne({username});

        if(userExist){
            return res.status(400).json({msg :"username exist"});
        }


        const userCreated = await User.create({ username, password});
        res
        .status(201)
        .json({ 
            msg: "Login Successful", 
            token: await userCreated.generateToken(), 
            userId: userCreated._id.toString()});
    } catch (error) {
    //    res.status(500).json("internal error..");
        next(error);
    }
}

const login = async (req,res) => {
    try {
        const { username ,password } = req.body;
        console.log("hiii");
       const userExist = await User.findOne({username});
        console.log(userExist);
       if(!userExist){
        return res.status(400).json({msg: "Invalid Credentials"});
       }

    //    const pass = await bcrypt.compare(password, userExist.password);
    const pass = await userExist.comparePassword(password);
       if(pass){
        res
        .status(200)
        .json({ 
            msg: "Login Successful", 
            token: await userExist.generateToken(), 
            userId: userExist._id.toString(),});
       }else{
        res.status(401).json({msg: "Invalid username and password"})
       }
    } catch (error) {
        // res.status(500).json("internal error");
        next(error);
    }
}

module.exports = { home,register,login };