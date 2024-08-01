import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import GlobalStyles from "./Styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Cabins from "./pages/Cabins";
import Bookings from "./pages/Bookings";
import NewUsers from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
const Router = createBrowserRouter([
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
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <GlobalStyles />
      <HelmetProvider>
        <RouterProvider router={Router} />
      </HelmetProvider>
      <Toaster
        position="top-center"
        gutter={12}
        toastOptions={{
          style: {
            maxWidth: "500px",
            background: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
            padding: "1rem",
            fontSize: "1.4rem",
            borderRadius: "8px",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
