import React from "react";
import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import Login from "./pages/Login";
import Secret from "./pages/Secret";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/Register";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home/Home";
import Menu from "./components/menu/Menu";
import Navbar from "./components/navbar/Navbar";
const queryClient = new QueryClient();

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Layout />} />
//         <Route path="/register" element = {<Register/>}/>
//         <Route path="/login" element={<Login />} />
//         <Route path="/Secret" element={<Secret />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }
function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </div>
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/secret",
      element: <Secret />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
