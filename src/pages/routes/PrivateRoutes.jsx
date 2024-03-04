import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

const PrivateRoutes = () => {
    const goTo = useNavigate();
    const token = localStorage.getItem('auth') || null;

    useEffect(() => {
        if (token === null) {
            goTo('/login');
        } else if(token.iat < Date.now()) {
            localStorage.removeItem('auth')
            goTo('/login');
        }
    }, []);

    return token !== null && <Outlet />;
};
export default PrivateRoutes;
