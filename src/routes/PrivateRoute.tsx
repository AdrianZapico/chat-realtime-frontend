import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";

interface PrivateRouteProps {
    children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;
