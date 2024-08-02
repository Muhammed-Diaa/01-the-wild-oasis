import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Cabins from "../pages/Cabins";
import Bookings from "../pages/Bookings";
import NewUsers from "../pages/Users";
import Settings from "../pages/Settings";
import Account from "../pages/Account";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import AppLayout from "../ui/AppLayout";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        index: true,
        element: <Navigate replace to="/dashboard" />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/bookings",
        element: <Bookings />,
      },
      {
        path: "/cabins",
        element: <Cabins />,
      },
      {
        path: "/user",
        element: <NewUsers />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/account",
        element: <Account />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
export default router;
