import React from "react";
import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/SignUp/SignUp";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import { profile } from "console";
import Profile from "./pages/Profile";
// import Sample from "./pages/sample";
import { useState } from "react";
import Layout from "./components/Layout/Layout";
import NewPassword from "./pages/ForgotPassword/NewPassword";
import VendorForm from "./pages/Vendor/VendorRegistration";
import ProfilePage from "./pages/Profile/Profile";
import SearchVendor from "./components/vendor/search_vendor";
import ModifyVendor from "./components/vendor/modify_vendor";
import AddVendor from "./components/vendor/add_vendor";
import ResetVendorPassword from "./components/vendor/resetpsw_vendor";
import ViewVendor from "./components/vendor/view_vendor";
import UpdateVendor from "./components/vendor/update_vendor";

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
        // {
        //   path: "/sample",
        //   element: <Sample />,
        // },
        {
          path: "/vendor/onboarding",
          element: <VendorForm />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/vendor/search",
          element: <SearchVendor />,
        },
        {
          path: "/vendor/modify",
          element: <ModifyVendor />,
        },
        {
          path: "/vendor/create",
          element: <AddVendor />,
        },
        {
          path: "/vendor/view",
          element: <ViewVendor />,
        },
        {
          path: "/vendor/update",
          element: <UpdateVendor />,
        },
        {
          path: "/vendor/reset-password",
          element: <ResetVendorPassword />,
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
      element: <NewPassword />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
