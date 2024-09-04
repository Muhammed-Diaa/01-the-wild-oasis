import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Cabins from "../pages/Cabins";
import Bookings from "../pages/Bookings";
import Settings from "../pages/Settings";
import Account from "../pages/Account";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import AppLayout from "../ui/AppLayout";
import BookingDetail from "../features/bookings/BookingDetail";
import Checkin from "../ui/Checkin";
import ProtectedRoutes from "../ui/ProtectedRoutes";

export const router = createBrowserRouter([
  {
    element: (
      <ProtectedRoutes>
        <AppLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/",

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
        path: "/bookings/Details/:NameID",
        element: <BookingDetail />,
      },
      {
        path: "/bookings/checkin/:NameID",
        element: <Checkin />,
      },
      {
        path: "/cabins",
        element: <Cabins />,
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
