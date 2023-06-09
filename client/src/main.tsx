import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter, createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./component/Home/Home";
import ProfileView from "./component/Profile/ProfileView";
import Profile from "./component/Profile/Profile";
import { GoalForm } from "./component/Goal/GoalForm";
import { Feed } from "./component/Feed/Feed";
import { PostForm } from "./component/Feed/PostForm/PostForm";
import UserProfile from "./component/Profile/UserProfile";
import NotFound from "./component/ErrorCodes/NotFound";
import Unauthorized from "./component/ErrorCodes/Unauthorized";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/Profile",
        element: <Profile />,
      },
      {
        path: "/users/:id",
        element: <UserProfile />,
      },
      {
        path: "/Goalcreation",
        element: <GoalForm />,
      },
      {
        path: "/Feed",
        element: <Feed />,
      },
      {
        path: "/Postcreation",
        element: <PostForm />,
      },
      {
        path: "/unauthorized",
        element: <Unauthorized />,
      },
      {
        path: "/*",
        element: <NotFound />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <RouterProvider router={router} />
    {/* <BrowserRouter>
        <App />
      </BrowserRouter> */}
  </GoogleOAuthProvider>
);
