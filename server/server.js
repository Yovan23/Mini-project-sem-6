require('dotenv').config();
const express = require("express");
const router = require("./router/auth_router");
const app = express();
const connectDb = require("./utils/db");
const errorMiddleware = require('./middlleware/error_middleware');

const PORT = 5000;

app.use(express.json());

app.use("/api/auth",router);

app.use(errorMiddleware);

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log("Server run...");
    });
});
