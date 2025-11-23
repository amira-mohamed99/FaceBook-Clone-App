import axios from "axios";
const api_URL = import.meta.env.VITE_BASE_URL;

export async function createComment(comment) {
  const data = await axios.post(`${api_URL}/comments`, comment, {
    headers: {
      "token": localStorage.getItem("userToken"),
    },
  });
  return data;
}
export async function deleteComment(commentId) {
  const data = await axios.delete(`${api_URL}/comments/${commentId}`, {
    headers: {
      "token": localStorage.getItem("userToken"),
    },
  });
  return data;
}
export function getPostComments(postId) {
  return axios.get(`${api_URL}/posts/${postId}/comments`, {
    headers: {
      "token": localStorage.getItem("userToken"),
    },
  });
}
export async function updateComments(commentId, body) {
  const data = await axios.put(`${api_URL}/comments/${commentId}`, body, {
    headers: {
      "token": localStorage.getItem("userToken"),
    },
  });
  return data;
}
