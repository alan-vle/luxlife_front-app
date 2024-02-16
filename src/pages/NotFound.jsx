import {Link} from "react-router-dom";
import {Button, Typography} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPersonWalkingArrowLoopLeft} from "@fortawesome/free-solid-svg-icons";

const NotFound = () => {
    return(
        <div className={"grid grid-cols-2 mt-28 mb-[350px]"}>
            <div className={"col-span-2 flex justify-center"}>
                <Typography variant={"h1"} className={"text-black font-bold text-[100px]"}>404. Oops</Typography> <br />
            </div>
            <div className={"col-span-2 flex justify-center"}>
                <Typography variant={"paragraph"} className={"text-black font-bold text-[50px]"}>Il semble qu'il n'y ait rien ici..</Typography>
            </div>
            <div className={"col-span-2 flex justify-center"}>
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