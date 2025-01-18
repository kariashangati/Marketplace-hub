import axios from "axios"

export const getProductLikes = async (token,productId) =>{
    const response = await axios.get(`http://localhost:3000/api/likes/getProductLikes?productId=${productId}`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}

export const likeAProduct = async (token,data) =>{
    const response = await axios.post(`http://localhost:3000/api/likes/likeProduct`,data,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}