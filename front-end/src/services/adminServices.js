import axios from "axios";

export const getUsersListByPage = async (token, page) => {
  const response = await axios.get(
    `http://localhost:8000/api/user/getUsers?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const getStoresListByPage = async (token, page) => {
  const response = await axios.get(
    `http://localhost:8000/api/store/getStoresUsers?page=${page}`,
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

export const getAdminDashboardData = async (token) => {
  const response = await axios.get(
    "http://localhost:8000/api/admin/getAdminDataDashboard",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const deleteUserService = async (token, userId) => {
  const response = await axios.delete(
    `http://localhost:8000/api/user/deleteUser/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const deleteStoreById = async (token, storeId) => {
  const response = await axios.delete(
    `http://localhost:8000/api/store/deleteStore/${storeId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getTeamMembers = async (token) => {
    const response = await axios.get(`http://localhost:8000/api/admin/getAdmins`,{
      headers:{
        Authorization : `Bearer ${token}`
      }
    });
    return response;
}