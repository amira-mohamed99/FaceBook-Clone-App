import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../Context/UserContext.jsx";

export default function AppProtectedRoutes({children}) {
    const { token } = useContext(userContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

 return (
    <>
      {children}
    </>
  )}