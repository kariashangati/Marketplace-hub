const express = require("express");
const dbConnect = require("./config/db");

const server = express();
dbConnect()

server.listen(3000,() =>{
    console.log("running on port 3000");
})