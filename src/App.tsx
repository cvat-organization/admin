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
import ViewUser from "./components/users/view_user";
import ViewUserActivities from "./components/users/ViewUserActivities";
import UserActivities from "./components/users/UserActivities";
import SettingsPage from "./pages/Settings/settings";
import ViewActivities from "./pages/Activity/activity_table";

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
          path: "/settings",
          element: <SettingsPage />,
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
          path: "/users/activities",
          element: <ViewUserActivities />,
        },
        {
          path: "/user/:userId/activities",
          element: <UserActivities />,
        },
        {
          path: "/activities",
          element: <ViewActivities />,
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
