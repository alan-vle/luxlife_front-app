import { Button, Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import manHelperImage from "../../assets/man-helper.png";
import NewsletterBlock from "@/components/parts/NewsletterBlock.jsx";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

export function Footer() {
    const [displayNewsletter, setDisplayNewsletter] = useState(true);
    const location = useLocation();
    const { pathname } = location;

    useEffect(() => {
        if (
            pathname === '/account' || pathname === '/admin-area'
            || pathname === '/my-agency' || pathname === '/dashboard'
        ) {
            setDisplayNewsletter(false);
        }
    });

    return (
        <div className={"hidden"}>
            <div className="grid grid-cols-4 gap-4">
                <div></div>
                <div className="col-span-2 relative">
                    <div className={false === displayNewsletter ? 'hidden' : 'absolute bottom-0'}>
                        <NewsletterBlock />
                    </div>
                </div>
                <div className="flex justify-end items-end pr-8">
                    <Button variant={"text"} onClick={() => alert('Do you need help? Ok')}>
                        <img src={manHelperImage} alt=""/>
                    </Button>
                </div>
            </div>

            <footer className="flex w-full p-8 mt-5 flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between">
                <Typography color="blue-gray" className="font-semibold">
                    &copy; Luxlife
                </Typography>
                <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
                    <li>
                        <Typography
                            color="blue-gray"
                            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                        >
                            <Link to={"/about-us"}>A propos de nous</Link>
                        </Typography>
                    </li>
                    <li>
                        <Typography
                            as="a"
                            href="#"
                            color="blue-gray"
                            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                        >
                            CGV
                        </Typography>
                    </li>
                    <li>
                        <Typography
                            as="a"
                            href="#"
                            color="blue-gray"
                            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                        >
                            Nous contacter
                        </Typography>
                    </li>
                    <li>
                        <Typography
                            as="a"
                            href="https://www.facebook.com"
                            color="blue-gray"
                            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                        >
                            <FontAwesomeIcon icon={faFacebook} size="xl" />
                        </Typography>
                    </li>
                    <li>
                        <Typography
                            as="a"
                            href="https://www.instagram.com/"
                            color="blue-gray"
                            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                        >
                            <FontAwesomeIcon icon={faInstagram} size="xl" />
                        </Typography>
                    </li>
                </ul>
            </footer>
        </div>
    );
}

export default Footer;
