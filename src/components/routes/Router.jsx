import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import NotFound from "../pages/NotFound.jsx";
import Login from "../pages/Auth/Login.jsx";
import Home from "../pages/Home.jsx";
import BasketProvider from "../store/BasketContext.jsx";
import Header from "../parts/Header.jsx";
import Register from "../pages/Auth/Register.jsx";
import Profile from "../pages/Profile/Profile.jsx";
import ResetPassword from "../pages/ResetPassword.jsx";
import About from "../pages/About.jsx";
import Footer from "../parts/Footer.jsx";

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <BasketProvider>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="reset-password" element={<ResetPassword />} />
                        <Route element={<PrivateRoutes />}>
                            <Route path="profile" element={<Profile />} />
                        </Route>
                        <Route path="about-us" element={<About />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Footer />
                </BasketProvider>
            </BrowserRouter>
        </>
    );
};

export default Router;