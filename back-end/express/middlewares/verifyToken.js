const { default: axios } = require("axios");

const verifyToken = async (request,response,next) =>{
    const auth = request.headers['authorization'];

    if(!auth) return response.status(404).json({"message":"Token missed in header"});

    const token = auth.split(' ')[1];

    try {
        const responseFromLaravel = await axios.get("http://localhost:8000/api/validateToken",{
            headers:{
                "Authorization" : `Bearer ${token}`
            }
        })

        if(responseFromLaravel.status === 200){
            request.userId = responseFromLaravel.data.user.id;
            next();
        }
    } catch (error) {
        return response.status(401).json({
            "message" : error.message
        })
    }
}

module.exports = verifyToken;