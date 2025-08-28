import axios from "./axiosConfig";

export const getAllProducts = async () => {
  return await axios.get("/productData");
};

export const addProduct = async (productData) => {
  return await axios.post("/addProduct", productData, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};

export const deleteProduct = async (productId) => {
  return await axios.delete(`/deleteProduct/${productId}`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });  
};
