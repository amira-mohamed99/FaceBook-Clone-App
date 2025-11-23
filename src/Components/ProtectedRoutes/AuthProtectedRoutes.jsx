import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../Context/UserContext";

export default function AuthProtectedRoutes({ children }) {
  const { token } = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token]);

  return <>{children}</>;
}
