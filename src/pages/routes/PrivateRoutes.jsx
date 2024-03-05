import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import {jwtDecode} from "jwt-decode";

const PrivateRoutes = () => {
    const goTo = useNavigate();
    const token = localStorage.getItem('auth') || null;

    useEffect(() => {
        if (null === token) {
            goTo('/login');
        } else if(jwtDecode(token).exp < Date.now()) {
            console.log('aa')
            localStorage.removeItem('auth')
            goTo('/login');
        }
    }, []);

    return token !== null && <Outlet />;
};
export default PrivateRoutes;
