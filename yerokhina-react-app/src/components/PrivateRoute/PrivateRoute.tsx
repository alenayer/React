import type { ReactElement } from "react";

import { Navigate } from "react-router";
import { useAppSelector } from "../../store/store";
import { selectIsAuth } from "../../store/profileSlice";

const PrivateRoute = ({ children }: {children:ReactElement}) => {
    const isAuth  = useAppSelector(selectIsAuth);
    return isAuth ? children : <Navigate to='/signin' replace />
  };

  export default PrivateRoute;