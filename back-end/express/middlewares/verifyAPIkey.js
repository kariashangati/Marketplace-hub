require("dotenv").config();
const verifyAPIkey = async (request,response,next) =>{
    const apikeyexists = request.headers['authorization'];

    if(!apikeyexists) return response.status(404).json({"message":"Api key is required"});

    const APIKEY = apikeyexists.split(' ')[1];

    if(APIKEY !== process.env.API_KEY){
        return response.status(200).json({
            "message" : "the API key in invalid"
        })
    }else{
        next();
    }
}

module.exports = verifyAPIkey;