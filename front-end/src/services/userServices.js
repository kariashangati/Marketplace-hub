import axios from "axios";

export const searchUsersByUsername = async (token, username) => {
  const response = await axios.get(
    `http://localhost:8000/api/user/searchUsersByUsername?username=${username}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const getAuthenticatedUserData = async (token) => {
  const response = await axios.get(
    "http://localhost:8000/api/user/getUserData",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const editProfileData = async (token, data) => {
  const response = await axios.post(
    "http://localhost:8000/api/user/editProfile",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const viewUserData = async (token, userId) => {
  const response = await axios.get(
    `http://localhost:8000/api/user/viewUser/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const viewStoresUser = async (token, userId) => {
  const response = await axios.get(
    `http://localhost:8000/api/store/getStoresUser/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const viewSavedProducts = async (token, page) => {
  const response = await axios.get(
    `http://localhost:8000/api/product/getSavedProducts?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};


export const getTopUsersSer = async (token) =>{
    const response = await axios.get("http://localhost:8000/api/suggesstion/topUsers",{
      headers:{
        "Authorization" : `Bearer ${token}`,
      }
    });
    return response;
}