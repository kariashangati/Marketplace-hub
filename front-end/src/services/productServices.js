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

export const getAllProducts = async () => {
  const response = await axios.get(`http://localhost:8000/api/product/getProducts`);
  return response;

};