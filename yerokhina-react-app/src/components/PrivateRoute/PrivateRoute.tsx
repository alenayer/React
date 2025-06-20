import type { ReactElement } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }: {children:ReactElement}) => {
    const { isAuth } = useAuth();
    return isAuth ? children : <Navigate to='/signin' replace />
  };

  export default PrivateRoute;