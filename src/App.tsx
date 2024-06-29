import Login from "./pages/Login/Login";
import Register from "./pages/SignUp/SignUp";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { QueryClient} from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Layout from "./components/Layout/Layout";
import NewPassword from "./pages/ForgotPassword/NewPassword";
import ViewVendor from "./pages/Vendor/vendor_page";
import ProfilePage from "./pages/Profile/Profile";
import SearchVendor from "./components/vendor/search_vendor";
import ModifyVendor from "./components/vendor/modify_vendor";
import AddVendor from "./components/vendor/add_vendor";
import ResetVendorPassword from "./components/vendor/resetpsw_vendor";
import UpdateVendor from "./components/vendor/update_vendor";
import ViewUser from "./components/users/view_user";
import UpdateUser from "./components/users/update_user";
import ViewUserActivities from "./components/users/ViewUserActivities";
import ViewActivities from "./pages/Activity/activity_table";
import UserActivities from "./components/users/UserActivities";

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
          path: "/vendor",
          element: <ViewVendor />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/users/view",
          element: <ViewUser />,
        },
        {
          path: "/user/update",
          element: <UpdateUser />,
        },
        {
          path: "/activities",
          element: <ViewActivities />,
        },
        {
          path: "/user/:userId/activities",
          element: <UserActivities />,
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
