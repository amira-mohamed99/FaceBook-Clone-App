import axios from "axios";
const api_URL=import.meta.env.VITE_BASE_URL


export async function registerUser(formData) {
  const data = axios.post(
   `${api_URL}/users/signup` ,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data;
}
export async function loginUser(formData) {
  const data = axios.post(
    `${api_URL}/users/signin`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data;
}
