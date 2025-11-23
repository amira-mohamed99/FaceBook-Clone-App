import axios from "axios";
const api_URL = import.meta.env.VITE_BASE_URL;

export function getAllPosts(page) {
  return axios.get(`${api_URL}/posts`, {
    headers: {
      "token": localStorage.getItem("userToken"),
    },
    params: {
      limit: 50,
      sort: "-createdAt",
      page
    },
  });
}

export function getSinglePost(id) {
  return axios.get(`${api_URL}/posts/${id}`, {
    headers: {
      "token": localStorage.getItem("userToken"),
    },
  });
}
export async function createPost(formData) {
  const data = await axios.post(`${api_URL}/posts`, formData, {
    headers: {
      "token": localStorage.getItem("userToken"),
    },
  });
  return data;
}
export async function getLoggedUserData() {
  const data = await axios.get(`${api_URL}/users/profile-data`, {
    headers: {
      "token": localStorage.getItem("userToken"),
    },
  });
  return data;
}
export async function deletePost(id) {
  const data = await axios.delete(`${api_URL}/posts/${id}`, {
    headers: {
      "token": localStorage.getItem("userToken"),
    },
  });
  return data;
}
export async function updatePost(id, formData) {
  const data = await axios.put(`${api_URL}/posts/${id}`, formData, {
    headers: {
      "token": localStorage.getItem("userToken"),
    },
  });
  return data;
}
