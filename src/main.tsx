import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { MainApp } from "./App.tsx";
import { ErrorPage } from "./components/pages/ErrorPage.tsx";
import "./index.css";
import { Contact } from "./components/pages/Contact.tsx";
import { AboutUs } from "./components/pages/AboutUs.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainApp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "contacts/:contactId",
    element: <Contact />,
  },
  {
    path: "about-us",
    element: <AboutUs />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
