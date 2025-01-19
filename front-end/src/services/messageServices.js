import axios from "axios"


export const getMessages = async (token,conversationId) =>{
    const response = await axios.get(`http://localhost:3000/api/messages/getMessages?conversationId=${conversationId}`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}

export const postMessage = async (token,data) =>{
    const response = await axios.post(`http://localhost:3000/api/messages/postMessage`,data,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}


export const deleteMessage = async (token,messageId) =>{
    const response = await axios.delete(`http://localhost:3000/api/messages/deleteMessage/${messageId}`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}