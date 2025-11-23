import axios from "axios";
const api_URL = import.meta.env.VITE_BASE_URL;

export async function uploadPhoto(formData) {
  const data = await axios.put(`${api_URL}/users/upload-photo`, formData, {
    headers: {
      token: localStorage.getItem("userToken"),
    },
  });
  return data;
}
export async function changePassword(password, newPassword) {
  const {data} = await axios.patch(
    `${api_URL}/users/change-password`,
    { password, newPassword },
    {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    }
  );
  return data;
}
