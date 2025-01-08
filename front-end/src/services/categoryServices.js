import axios from "axios"

export const getCategoryList = async (token) => {
    const response = await axios.get(`http://localhost:8000/api/category/viewCategories`,
    {
            headers:{
                Authorization : `Bearer ${token}`,
            }
    });
    return response
};
  
export const deleteCategoryService = async (token,CategoryId) => {
    const response = await axios.delete(`http://localhost:8000/api/category/deleteCategory/${CategoryId}`,
        {
            headers:{
                Authorization : `Bearer ${token}`,
            }
    });
    return response
}
export const addNewCategory = async (token,data) =>{
    const response = await axios.post(`http://localhost:8000/api/category/addCategory`,data,{
      headers : {
        Authorization : `Bearer ${token}`
      }
    });
    return response;
}