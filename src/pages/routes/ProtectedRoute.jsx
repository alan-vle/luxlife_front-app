import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import {CurrentUserRoles} from "@/utils/CurrentUser.js";
import {token} from "@/utils/auth.js";

const ProtectedRoute = ({ role }) => {
    const goTo = useNavigate();

    useEffect(() => {
        if (null === token) {
            goTo('/login');
        } else if (CurrentUserRoles()[0] !== role) {
            goTo('/not-found');
        }
    }, []);

    return CurrentUserRoles()[0] === role && <Outlet />;
}

export default ProtectedRoute;