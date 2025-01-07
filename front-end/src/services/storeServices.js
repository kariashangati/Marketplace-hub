import axios from "axios"

export const deleteStore = async (token,storeId) => {
    const response = await axios.delete(`http://localhost:8000/api/store/deleteStore/${storeId}`,{
        headers:{
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}

export const getUserStoresList = async (token,page) => {
    const response = await axios.get(`http://localhost:8000/api/store/getUserStores?page=${page}`,{
        headers :{
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}