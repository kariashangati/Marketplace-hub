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
  const response = await axios.delete(
    `http://localhost:8000/api/product/deleteSavedProduct/${productId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const getProductsBy = async (token, data) => {
  const response = await axios.get(
    "http://localhost:8000/api/product/getProductfiltrer",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        category_id: data.category_id,
        price: data.price,
        delivry: data.delivry,
      },
    }
  );
  return response;
};

export const getProductsByStore = async (token, id) => {
  const response = await axios.get(
    `http://localhost:8000/api/product/getProductsByStore/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
