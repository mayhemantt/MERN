import axios from "axios";

export const getCategories = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/categories`);
};

export const getCategory = async (slug) => {
  return axios.get(`${process.env.REACT_APP_API}/category/${slug}`);
};

export const removeCategory = async (slug, authtoken) => {
  return axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
    headers: {
      authtoken,
    },
  });
};

export const updateCategory = async (slug, category, authtoken) => {
  return axios.put(`${process.env.REACT_APP_API}/category/${slug}`, category, {
    headers: {
      authtoken,
    },
  });
};

export const createCategory = async (category, authtoken) => {
  return axios.post(`${process.env.REACT_APP_API}/category/`, category, {
    headers: {
      authtoken,
    },
  });
};
