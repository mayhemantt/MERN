import axios from "axios";

export const getSub = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/subCategory`);
};

export const getSub = async (slug) => {
  return axios.get(`${process.env.REACT_APP_API}/subCategory/${slug}`);
};

export const removeSub = async (slug, authtoken) => {
  return axios.delete(`${process.env.REACT_APP_API}/subCategory/${slug}`, {
    headers: {
      authtoken,
    },
  });
};

export const updateSub = async (slug, sub, authtoken) => {
  return axios.put(`${process.env.REACT_APP_API}/subCategory/${slug}`, sub, {
    headers: {
      authtoken,
    },
  });
};

export const createSub = async (sub, authtoken) => {
  return axios.post(`${process.env.REACT_APP_API}/subCategory/`, sub, {
    headers: {
      authtoken,
    },
  });
};
