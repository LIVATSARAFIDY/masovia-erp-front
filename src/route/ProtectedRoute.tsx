import { Navigate } from "react-router";
import type { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    
    const userConnected = localStorage.getItem('userConnected');
    return !userConnected ? <Navigate to="/login" replace /> :  children;

};

export default ProtectedRoute;