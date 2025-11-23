import { createContext, useEffect, useState } from "react";
import { getLoggedUserData } from "../../Services/postServices";
import { changePassword, uploadPhoto } from "../../Services/userServices";

export const userContext = createContext();

export default function UserContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("userToken"));
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  async function getUserData() {
    setIsLoading(true);
    try {
      const { data } = await getLoggedUserData();
      setUserData(data?.user);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  async function uploadUserPhoto(photoFile) {
    const formData = new FormData();
    formData.append("photo", photoFile);
    try {
      await uploadPhoto(formData);
      const { data } = await getLoggedUserData();
      setUserData(data.user);
      return data.user;
    } catch (error) {
      console.log(error);
    }
  }

  async function changeUserPass(password, newPassword) {
    setIsLoading(true);
    try {
      const  {message , token : newToken}  = await changePassword(
        password,
        newPassword
      );
      console.log(newToken);
      
      if (newToken) {
        localStorage.setItem("userToken", newToken);
        setToken(newToken);
        await getUserData();
      }
      return message;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    if (token) {
      getUserData();
    }
  }, [token]);

  return (
    <userContext.Provider
      value={{
        token,
        setToken,
        userData,
        isLoading,
        uploadUserPhoto,
        changeUserPass,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
