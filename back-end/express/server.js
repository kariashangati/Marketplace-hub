const express = require("express");
const dbConnect = require("./config/db");
const cors = require("cors");
const verifyToken = require("./middlewares/verifyToken");
const verifyAPIkey = require("./middlewares/verifyAPIkey");
const { deleteUserDeletedData } = require("./controllers/userDataController");
const { deleteProductData } = require("./controllers/deleteProductData");

const server = express();
dbConnect()

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(cors({
    origin : ["http://localhost:5173", "http://localhost:8000"],
    methods : ["GET","POST","PUT","DELETE"],
}));

server.delete("/api/deleteUserData",verifyAPIkey,deleteUserDeletedData);
server.delete("/api/deleteProductData",verifyAPIkey,deleteProductData);

server.use(verifyToken);
server.use("/api/comments", require("./routes/commentRoutes"));
server.use("/api/notifications", require("./routes/notificationRoutes"));
server.use("/api/likes", require("./routes/likeRoutes"));
server.use("/api/conversations", require("./routes/conversationRoutes"));
server.use("/api/messages", require("./routes/messageRoutes"));

server.listen(3000,() =>{
    console.log("running on port 3000");
})