import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { authUser, checkUserAuth } from "../services/get-user-slice";



export const ProtectedRouteElement = ({checkAuth = false, component}) => {

    const checkUser = checkUserAuth();
    const location = useLocation();

    if(checkAuth && checkUser) {
        const { from } = location.state || { from: { pathname: "/" } };
        return <Navigate to={from} />
    }

    if(!checkUser && !checkAuth) return <Navigate to="/login"/>

    return component
}
