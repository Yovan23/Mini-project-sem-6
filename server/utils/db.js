const mongoose = require("mongoose");

// const URI = "mongodb://127.0.0.1:27017/subAdmin";
//  mongoose.connect(URI);
const URI = process.env.MONGODB_URI ;
const connectDb = async () =>{
    try {
        await mongoose.connect(URI);
        console.log("databasse connection done..");
    } catch (error) {
        console.error("dtabase connection error..");
        process.exit(0);
    }
}

module.exports = connectDb;