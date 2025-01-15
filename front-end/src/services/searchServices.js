import axios from "axios"

export const getSearchData = async (token,query) =>{
    const response = await axios.get(`http://localhost:8000/api/suggesstion/searchByQuery?query=${query}`,{
        headers :{
            "Authorization" : `Bearer ${token}`
        }
    });
    return response;
}

export const postSearch = async (token,data) =>{
    const response = await axios.post("http://localhost:8000/api/search/postSearch",data,{
        headers :{
            "Authorization" : `Bearer ${token}`
        }
    });
    return response;
}

export const getSearchesBy = async (token) =>{
    const response = await axios.get(`http://localhost:8000/api/search/getSearches`,{
        headers :{
            "Authorization" : `Bearer ${token}`
        }
    });
    return response;
}

export const deleteSearchesBy = async (token, Id) => {
    const response = await axios.delete(
      `http://localhost:8000/api/search/deleteSearch/${Id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };