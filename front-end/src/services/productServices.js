import axios from "axios";

export const getPendingProducts = async (token) => {
  const response = await axios.get(
    "http://localhost:8000/api/product/getPendingProducts",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const deleteProductById = async (token, productId) => {
  const response = await axios.delete(
    `"http://localhost:8000/api/product/deleteProduct/${productId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
