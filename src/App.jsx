import { createBrowserRouter, Navigate } from "react-router";
import { RouterProvider } from "react-router/dom";
import Authlayout from "./Layout/AuthLayout/AuthLayout.jsx";
import NewsFeed from "./Pages/NewsFeed/NewsFeed.jsx";
import Notfound from "./Pages/Notfound/Notfound.jsx";
import Register from "./Pages/Auth/Register/Register.jsx";
import Login from "./Pages/Auth/Login/Login.jsx";
import UserProfile from "./Pages/UserProfile/UserProfile.jsx";
import AppProtectedRoutes from "./Components/ProtectedRoutes/AppProtectedRoutes.jsx";
import AuthProtectedRoutes from "./Components/ProtectedRoutes/AuthProtectedRoutes.jsx";
import PostDetails from "./Pages/PostDetails/PostDetails.jsx";
import Mainlayout from "./Layout/MainLayout/MainLayout.jsx";


function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: (
        <AppProtectedRoutes>
          <Mainlayout />
        </AppProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: (
            <AppProtectedRoutes>
              <NewsFeed />
            </AppProtectedRoutes>
          ),
        },
        {
          path: "/home",
          element: (
            <AppProtectedRoutes>
              <NewsFeed />
            </AppProtectedRoutes>
          ),
        },
        {
          path: "/profile",
          element: (
            <AppProtectedRoutes>
              <UserProfile />
            </AppProtectedRoutes>
          ),
        },
        {
          path: "*",
          element: <Notfound />,
        },
        {
          path: "/post-detailes/:id",
          element: (
            <AppProtectedRoutes>
              <PostDetails />
            </AppProtectedRoutes>
          ),
        },
      ],
    },
    {
      path: "",
      element: <Authlayout />,
      children: [
        {
          path: "register",
          element: (
            <AuthProtectedRoutes>
              {" "}
              <Register />
            </AuthProtectedRoutes>
          ),
        },
        {
          path: "login",
          element: (
            <AuthProtectedRoutes>
              <Login />
            </AuthProtectedRoutes>
          ),
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
