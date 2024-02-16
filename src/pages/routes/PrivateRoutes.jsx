import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

const PrivateRoutes = () => {
    const goTo = useNavigate();
    const token = sessionStorage.getItem('token') || null;

    useEffect(() => {
        if (token === null) {
            goTo('/login');
        }
    }, []);

    return token !== null && <Outlet />;
};
export default PrivateRoutes;
