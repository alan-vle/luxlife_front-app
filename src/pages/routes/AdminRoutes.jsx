import {Outlet, useNavigate} from "react-router";
import {useEffect} from "react";
import {IsAdmin} from "@/utils/CurrentUser.js";
import {token} from "@/utils/auth.js";

const AdminRoutes = () => {
    const goTo = useNavigate();

    useEffect(() => {
        if (null === token) {
            goTo('/login');
        } else if(false === IsAdmin()) {
            goTo('/not-found')
        }
    }, []);

    return IsAdmin() && <Outlet />;
}

export default AdminRoutes;