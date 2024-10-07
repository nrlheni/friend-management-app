import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const [cookies] = useCookies(['userId', 'userName', 'userEmail']);

    if (!cookies.userId) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;
