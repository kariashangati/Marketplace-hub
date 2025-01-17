import axios from "axios"

export const getNotifications = async (token) =>{
    const response = await axios.get("http://localhost:3000/api/notifications/getNotifications",{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}

export const postNotification = async (token,data) =>{
    const response = await axios.post("http://localhost:3000/api/notifications/postNotification",data,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}