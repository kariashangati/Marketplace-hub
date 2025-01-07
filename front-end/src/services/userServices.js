import axios from "axios"

export const searchUsersByUsername = async(token,username) =>{
    const response = await axios.get(`http://localhost:8000/api/user/searchUsersByUsername?username=${username}`,{
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    });
    return response;
}
