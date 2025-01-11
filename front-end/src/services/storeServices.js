import axios from "axios"

export const deleteStore = async (token,storeId) => {
    const response = await axios.delete(`http://localhost:8000/api/store/deleteStore/${storeId}`,{
        headers:{
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}

export const getUserStoresList = async (token) => {
    const response = await axios.get(`http://localhost:8000/api/store/getUserStores`,{
        headers :{
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}


export const createStore = async (token,data) => {
    const response = await axios.post(`http://localhost:8000/api/store/createStore`,data,{
        headers :{
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}


export const getStore = async (token,id) => {
    const response = await axios.get(`http://localhost:8000/api/store/getStoresData/${id}`,{
        headers :{
            Authorization : `Bearer ${token}`
        }
    });
    return response;
} 
