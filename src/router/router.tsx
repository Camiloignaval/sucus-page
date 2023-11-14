import { MainLayout } from "../components/ui/MainLayout";
import { ErrorPage } from "../components/pages/ErrorPage";
import { createBrowserRouter } from "react-router-dom";
import { Contact } from "../components/pages/Contact";
import { AboutUs } from "../components/pages/AboutUs";
import { CartLayout } from "../components/ui/CartLayout";
import { Cart } from "../components/pages/Cart";
import { Home } from "../components/pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      // {
      //   path: "home",
      //   element: <Contact />,
      // },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
    ],
  },
  {
    path: "/cart",
    element: <CartLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Cart />,
      },
    ],
  },
]);

export default router;
