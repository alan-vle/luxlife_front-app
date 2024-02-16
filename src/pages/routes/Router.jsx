import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes.jsx';
import NotFound from "../NotFound.jsx";
import Login from "../Auth/Login.jsx";
import Home from "../Home/Home.jsx";
import BasketProvider from "../../components/store/BasketContext.jsx";
import Header from "../../components/parts/Header.jsx";
import Register from "../Auth/Register.jsx";
import Account from "../Account/Account.jsx";
import ResetPassword from "../Account/ResetPassword.jsx";
import About from "../About.jsx";
import Footer from "../../components/parts/Footer.jsx";
import Agencies from "../Agencies.jsx";
import CarsFound from "@/pages/Rental/CarsFound.jsx";
import ConfirmEmail from "@/pages/Account/ConfirmEmail.jsx";
import ForgotPassword from "@/pages/Account/ForgotPassword.jsx";

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
                        <Route path="confirm-email/:uuid" element={<ConfirmEmail />} />
                        <Route path="forgot-password" element={<ForgotPassword />} />
                        <Route path="reset-password/:token" element={<ResetPassword />} />
                        <Route path="agencies" element={<Agencies />} />
                        <Route path="cars-found" element={<CarsFound />} />
                        <Route element={<PrivateRoutes />}>
                            <Route path="account" element={<Account />} />
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
