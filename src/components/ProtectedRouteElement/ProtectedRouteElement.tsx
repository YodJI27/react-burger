import { Navigate, useLocation } from "react-router-dom";
import { checkUserAuth } from "../services/get-user-slice";

interface IProtectedRouteElement {
    checkAuth?: boolean,
    component: any
}

export const ProtectedRouteElement = ({checkAuth = false, component}: IProtectedRouteElement) => {

    const checkUser = checkUserAuth();
    const location = useLocation();

    if(checkAuth && checkUser) {
        const { from } = location.state || { from: { pathname: "/" } };
        return <Navigate to={from} />
    }

    if(!checkUser && !checkAuth) return <Navigate to="/login"/>

    return component
}
