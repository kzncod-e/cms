import { createBrowserRouter, redirect } from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/Login";
import Add from "../views/Addform";
import BaseLayeout from "../views/BaseLayeout";
import Edit from "../views/EditForm";
const url = "https://h8-phase2-gc.vercel.app";

import Categories from "../components/Catagories";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login url={url} />,
    loader: () => {
      if (localStorage.token) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    element: <BaseLayeout />,
    loader: () => {
      if (!localStorage.token) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <Home url={url} />,
      },
      {
        path: "/add",
        element: <Add url={url} />,
      },
      {
        path: "/edit/:id",
        element: <Edit url={url} />,
      },
      {
        path: "/categories",
        element: <Categories url={url} />,
      },
    ],
  },
]);
export default router;
