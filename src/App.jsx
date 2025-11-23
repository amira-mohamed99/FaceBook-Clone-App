import { createBrowserRouter, Navigate } from "react-router";
import { RouterProvider } from "react-router/dom";
import Authlayout from "./Layout/Authlayout/Authlayout";
import NewsFeed from "./Pages/NewsFeed/NewsFeed";
import Notfound from "./Pages/Notfound/Notfound";
import Register from "./Pages/Auth/Register/Register";
import Login from "./Pages/Auth/Login/Login";
import UserProfile from "./Pages/UserProfile/UserProfile";
import AppProtectedRoutes from "./Components/ProtectedRoutes/AppProtectedRoutes";
import AuthProtectedRoutes from "./Components/ProtectedRoutes/AuthProtectedRoutes";
import PostDetails from "./Pages/PostDetails/PostDetails";
import Mainlayout from "./Layout/MainLayout/MainLayout";


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
