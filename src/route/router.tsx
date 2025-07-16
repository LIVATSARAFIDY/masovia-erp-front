import { createBrowserRouter } from "react-router";
import App from "../App.tsx";
import Invoice from "../page/invoice.tsx";
import Register from "../page/register/Register.tsx";
import Login from "../page/login/Login.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import PublicRoute from "./PublicRoute.tsx";
const router = createBrowserRouter([
  
  {
    path: "/",
    element: <App />
  },
  {
    path: "/invoice",

    element: (
      <ProtectedRoute><Invoice/></ProtectedRoute>
    )
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