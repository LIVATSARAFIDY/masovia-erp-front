import { Navigate } from "react-router";
import type { JSX } from "react";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
    
    const userConnected = localStorage.getItem('userConnected');
    return userConnected ? <Navigate to="/dashboard" replace /> :  children;

};

export default PublicRoute;