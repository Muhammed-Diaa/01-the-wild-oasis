import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import GlobalStyles from "./Styles/GlobalStyles";

import queryClient from "./utils/queryClient";
import router from "./utils/router";

function App() {
  return (
    <HelmetProvider>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />

        <RouterProvider router={router} />

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
    </HelmetProvider>
  );
}

export default App;
