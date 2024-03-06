import React from "react";
import {
    Navbar,
    Collapse,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUser} from "@fortawesome/free-regular-svg-icons";
import luxlifeLogo from "@/assets/luxlife_logo.png";
import {isAuth} from "@/utils/auth.js";
import ProfileMenu from "@/components/parts/ProfileMenu.jsx";
import {IsAdmin, IsAgent, IsCustomer, IsDirector} from "@/utils/CurrentUser.js";
function NavList() {
    return (
        <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            {(!isAuth() || IsCustomer()) && (
                <>
                    <Typography
                        as="a"
                        variant="h6"
                        className="cursor-pointer py-1.5"
                    >
                        <Link to="/agencies" className="flex items-center hover:text-blue-500 transition-colors">
                            Nos agences
                        </Link>
                    </Typography>
                    <div className={"py-1.5 font-bold"}>|</div>
                    <Typography
                        as="a"
                        variant="h6"
                        className=" cursor-pointer py-1.5"
                    >
                        <Link to="/about-us" className="flex items-center hover:text-blue-500 transition-colors">A propos</Link>
                    </Typography>
                </>
            )}
        </ul>
    );
}

function NavbarSimple() {
    const [openNav, setOpenNav] = React.useState(false);

    const handleWindowResize = () =>
        window.innerWidth >= 960 && setOpenNav(false);

    React.useEffect(() => {
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    return (
        <Navbar className="mx-auto px-6 py-3" fullWidth={true}>
            <div className="flex grid grid-cols-12 items-center text-blue-gray-900">
                <div className="hidden lg:block col-span-4">
                    <NavList />
                </div>
                <div className="hidden lg:flex items-center justify-center col-span-4">
                    <Link to="/" className={"w-[200px] h-[150px] absolute"}>
                        <img src={luxlifeLogo} alt="Luxlife logo" className=""/>
                    </Link>
                </div>
                <div className={"col-span-4 flex justify-end items-center"}>
                    {!isAuth() ? (
                        <>
                            <div className="hidden gap-2 lg:flex">
                                <FontAwesomeIcon icon={faCircleUser} className="py-2" size="lg" />
                                <Typography
                                    as="a"
                                    variant="h6"
                                    className="cursor-pointer py-1.5"
                                >
                                    <Link to="/login" className="flex items-center hover:text-blue-500 transition-colors">
                                        Connexion
                                    </Link>
                                </Typography>
                                <div className="py-1.5 font-bold">|</div>
                                <Typography
                                    as="a"
                                    variant="h6"
                                    className="cursor-pointer py-1.5"
                                >
                                    <Link to="/register" className="flex items-center hover:text-blue-500 transition-colors">
                                        Inscription
                                    </Link>
                                </Typography>
                            </div>
                            <IconButton
                                variant="text"
                                className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                                ripple={false}
                                onClick={() => setOpenNav(!openNav)}
                            >
                                {openNav ? (
                                    <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                                ) : (
                                    <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                                )}
                            </IconButton>
                        </>
                    ) : (
                        <>
                            {IsAdmin() ? (
                                <>
                                    <Typography
                                        as="a"
                                        variant="h6"
                                        className="cursor-pointer py-1.5"
                                    >
                                        <Link to="/admin-area" className="flex items-center hover:text-blue-500 transition-colors">Espace d'administration</Link>
                                    </Typography>
                                    <div className="py-1.5 font-bold ml-2 mr-2">|</div>
                                </>
                            ) : IsDirector() ? (
                                <>
                                    <Typography
                                        as="a"
                                        variant="h6"
                                        className="cursor-pointer py-1.5"
                                    >
                                        <Link to="/my-agency" className="flex items-center hover:text-blue-500 transition-colors">Mon agence</Link>
                                    </Typography>
                                    <div className="py-1.5 font-bold ml-2 mr-2">|</div>
                                </>
                            ) : IsAgent() ? (
                                <>
                                    <Typography
                                        as="a"
                                        variant="h6"
                                        className="cursor-pointer py-1.5"
                                    >
                                        <Link to="/dashboard" className="flex items-center hover:text-blue-500 transition-colors">Tableaux de bord</Link>
                                    </Typography>
                                    <div className="py-1.5 font-bold ml-2 mr-2">|</div>
                                </>
                            ) : ''}
                            <div className="mr-8"><ProfileMenu /></div>
                        </>
                    )}
                </div>
            </div>
            <Collapse open={openNav} className={"text-blue-gray-900"}>
                <NavList />
                {!isAuth() ?
                    <>
                        <FontAwesomeIcon icon={faCircleUser} className={"py-2"} size={"lg"}/>
                        <Typography
                            as="a"
                            variant="h6"
                            className="cursor-pointer py-1.5"
                        >
                            <Link to={"/login"} className="flex items-center hover:text-blue-500 transition-colors">
                                Connexion
                            </Link>
                        </Typography>
                        <div className={"py-1.5 font-bold"}>|</div>
                        <Typography
                            as="a"
                            variant="h6"
                            className="cursor-pointer py-1.5"
                        >
                            <Link to={"/register"} className="flex items-center hover:text-blue-500 transition-colors">
                                Inscription
                            </Link>
                        </Typography>
                    </>
                    : <div className={"mr-8"}><ProfileMenu /></div>
                }

            </Collapse>
        </Navbar>
    );
}

export default NavbarSimple;