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
