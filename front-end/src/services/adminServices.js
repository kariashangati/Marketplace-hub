import axios from "axios";

export const getUsersList = async (token) => {
  const response = await axios.get("http://localhost:8000/api/user/getUsers", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const getStoresList = async (token) => {
  const response = await axios.get(
    "http://localhost:8000/api/store/getStoresUsers",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const searchStoresByName = async (token, name) => {
  const response = await axios.get(
    `http://localhost:8000/api/store/searchStoresByName`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        name,
      },
    }
  );
  return response.data;
};
