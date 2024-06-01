import React from "react";
import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/SignUp/SignUp";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home/Home";
import { profile } from "console";
import Profile from "./pages/Profile";
import Sample from "./pages/sample";
import { useState } from "react";
import Layout from "./components/Layout/Layout";
import NewPassword from "./pages/ForgotPassword/NewPassword";
import VendorForm from "./pages/Vendor/VendorRegistration";
import ProfilePage from "./pages/Profile/Profile";

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
        },
        {
          path: "/sample",
          element: <Sample />,
        },
        {
          path: "/vendor/onboarding",
          element: <VendorForm/>,
        },
      ],
    },
    {
      path: "/signup",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/forgotPassword",
      element: <ForgotPassword />,
    },
    {
      path: "/newpassword",
      element: <NewPassword/>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
