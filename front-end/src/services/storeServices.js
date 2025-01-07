import axios from "axios"

export const deleteStore = async (token,storeId) => {
    const response = await axios.delete(`http://localhost:8000/api/store/deleteStore/${storeId}`,{
        headers:{
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}