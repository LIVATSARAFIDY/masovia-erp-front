import { createBrowserRouter } from "react-router";
import App from "../App.tsx";
// import Invoice from "../page/invoice.tsx";
import Register from "../page/register/Register.tsx";
import Login from "../page/login/Login.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import PublicRoute from "./PublicRoute.tsx";
import Layout from "@/page/dashboard/Layout.tsx";
import Invoice from "@/components/features/invoice/invoice.tsx";
const router = createBrowserRouter([
  
  {
    path: "/",
    element: <App />
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute><Layout /></ProtectedRoute>,
    children: [
      {
        path: "",
        element: <Invoice />
      }
    ]
  },
  {
    path: "/login",
    element: <PublicRoute><Login/></PublicRoute>
  }
  ,
  {
    path: "/register",
    element: <PublicRoute><Register/></PublicRoute>
  }
]);

export default router;