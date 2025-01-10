import axios from "axios";

export const deleteProductById = async (token, productId) => {
  const response = await axios.delete(
    `http://localhost:8000/api/product/deleteProduct/${productId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const getAllProducts = async (page) => {
  const response = await axios.get(
    `http://localhost:8000/api/product/getProducts?page=${page}`
  );
  return response;
};

export const deleteSavedProduct = async (token, productId) => {
  const response = await axios.get(
    `http://localhost:8000/api/product/deleteSavedProduct/${productId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
