import axios from "axios"


export const getProductComments = async (token,productId) =>{
    const response = await axios.get(`http://localhost:3000/api/comments/getComments?productId=${productId}`,{
        headers :{
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}


export const postAComment = async (token,data) =>{
    const response = await axios.post("http://localhost:3000/api/comments/postComment",data,{
        headers : {
            "Authorization" : `Bearer ${token}`,
        }
    });
    return response;
}


export const deleteComment = async (token,commentId) =>{
    const response = await axios.delete(`http://localhost:3000/api/comments/deleteComment/${commentId}`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}