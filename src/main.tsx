import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./queryClient";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider
        iconVariant={{
          success: "✅",
          error: "✖️",
          warning: "⚠️",
          info: "ℹ️",
        }}
      >
        <RouterProvider router={router} />
      </SnackbarProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
