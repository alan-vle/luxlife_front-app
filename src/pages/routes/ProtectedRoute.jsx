import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import {CurrentUserRoles} from "@/utils/CurrentUser.js";
import {token} from "@/utils/auth.js";
import {jwtDecode} from "jwt-decode";

const ProtectedRoute = ({ role }) => {
    const goTo = useNavigate();

    useEffect(() => {
        if (null === token) {
            goTo('/login');
        }

        const expireDate = jwtDecode(token).exp * 1000;

        if(expireDate < Date.now()) {
            localStorage.removeItem('auth')
            goTo('/login');
        }

        if (role && CurrentUserRoles()[0] !== role) {
            goTo('/not-found');
        }
    }, []);

    return null !== token && (null === role || CurrentUserRoles()[0] === role) && <Outlet />;
}

export default ProtectedRoute;