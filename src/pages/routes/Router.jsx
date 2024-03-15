import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes.jsx';
import NotFound from "../NotFound.jsx";
import Login from "../Auth/Login.jsx";
import Home from "../Home/Home.jsx";
import BasketProvider from "../../store/BasketContext.jsx";
import Header from "../../components/parts/Header.jsx";
import Register from "../Auth/Register.jsx";
import Account from "../Account/Account.jsx";
import ResetPassword from "../Account/ResetPassword.jsx";
import About from "../About.jsx";
import Footer from "../../components/parts/Footer.jsx";
import Agencies from "../Agencies.jsx";
import CarsSearch from "@/pages/Rental/CarsSearch.jsx";
import ConfirmEmail from "@/pages/Account/ConfirmEmail.jsx";
import ForgotPassword from "@/pages/Account/ForgotPassword.jsx";
import AdminArea from "@/pages/Area/Admin/AdminArea.jsx";
import ProtectedRoute from "@/pages/routes/ProtectedRoute.jsx";
import DirectorArea from "@/pages/Area/Director/DirectorArea.jsx";
import AgentArea from "@/pages/Area/Agent/AgentArea.jsx";
import CustomerArea from "@/pages/Area/Customer/CustomerArea.jsx";
import {UserProvider} from "@/store/UserContext.jsx";

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <UserProvider>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/confirm-email/:uuid" element={<ConfirmEmail />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password/:token" element={<ResetPassword />} />
                        <Route path="/agencies" element={<Agencies />} />
                        <Route path="/cars/search-result" element={<CarsSearch />} />
                        <Route element={<ProtectedRoute role={null} />}>
                            <Route path="/account" element={<Account />} />
                        </Route>
                        <Route element={<ProtectedRoute role={'ROLE_ADMIN'} />}>
                            <Route path="/admin" element={<AdminArea />}/>
                        </Route>
                        <Route element={<ProtectedRoute role={'ROLE_DIRECTOR'} />}>
                            <Route path="/my-agency" element={<DirectorArea />}/>
                        </Route>
                        <Route element={<ProtectedRoute role={'ROLE_AGENT'} />}>
                            <Route path="/agent/dashboard" element={<AgentArea />}/>
                        </Route>
                        <Route element={<ProtectedRoute role={'ROLE_CUSTOMER'} />}>
                            <Route path="/dashboard" element={<CustomerArea />}/>
                        </Route>
                        <Route path="about-us" element={<About />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Footer />
                </UserProvider>
            </BrowserRouter>
        </>
    );
};

export default Router;
