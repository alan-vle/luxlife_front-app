import {Link} from "react-router-dom";
import {Button, Typography} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPersonWalkingArrowLoopLeft} from "@fortawesome/free-solid-svg-icons";

const NotFound = () => {
    return(
        <div className={"grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-1 lg:gap-8 xl:grid-cols-12 2xl:grid-cols-12 gap-2 pl-8 pt-4 mt-28 mb-[350px]"}>
            <div className={"xl:col-start-4 xl:col-span-6 2xl:col-start-4 2xl:col-span-6"}>
                <Typography variant={"h1"} className={"text-black font-bold text-[100px]"}>404. Oops</Typography> <br />
                <Typography variant={"paragraph"} className={"text-black font-bold text-[50px]"}>Il semble qu'il n'y ait rien ici..</Typography>
                <Link to={"/"} >
                    <Button variant={"text"} size={"lg"}>
                        <FontAwesomeIcon icon={faPersonWalkingArrowLoopLeft} />
                        &nbsp; Retourner à l'accueil
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default NotFound;