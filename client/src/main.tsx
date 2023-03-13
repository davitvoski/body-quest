import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./component/Home/Home";
import ProfileView from "./component/Profile/ProfileView";
import Profile from "./component/Profile/Profile";
import { GoalForm } from "./component/Goal/GoalForm";

const router = createBrowserRouter([
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
        path: "/Goalcreation",
        element: <GoalForm />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} />
      {/* <BrowserRouter>
        <App />
      </BrowserRouter> */}
    </GoogleOAuthProvider>
  </React.StrictMode>
);
