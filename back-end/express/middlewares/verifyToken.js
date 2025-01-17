const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = async (request,response,next) =>{
    const auth = request.headers['authorization'];

    if(!auth) return response.status(404).json({"message":"Token missed in header"});

    const token = auth.split(' ')[1];

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        request.userId = decoded.sub;
        request.username = decoded.username;
        request.profile_picture = decoded.profilePicture;
        next();

    } catch (error) {
        return response.status(401).json({
            "message" : error.message
        })
    }
}

module.exports = verifyToken;