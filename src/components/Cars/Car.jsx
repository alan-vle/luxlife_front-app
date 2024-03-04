import {Button, Typography} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faLocationDot} from "@fortawesome/free-solid-svg-icons";
const apiUrl = import.meta.env.VITE_API_URL;

function Car({displayAgency = false, choseMode, manufacturer, model, contentUrl, kilometers, agency, uuid}) {
    return(
        <div className={"mr-4 shadow flex flex-col col-span-2 p-8 w-96 max-w-96 mb-8"}>
            <div className={"flex justify-center"}>
                <img src={`${apiUrl}/${contentUrl}`} className={"w-[300px] max-w-[300px] h-[169px] max-h-[169px]"} alt={""}/>
            </div>

            <Typography variant={"h4"} className={"font-bold mt-8"}>
                {manufacturer.name} {model} <br />
                {kilometers} km
            </Typography>
            {displayAgency &&
                <Typography variant={"paragraph"}>
                    <span><FontAwesomeIcon icon={faLocationDot} /> Agence de {agency.city}</span> <br />
                    <span><FontAwesomeIcon icon={faClock} /> {agency.isOpen ? 'Ouverte' : 'Fermée'}</span>
                </Typography>
            }
            {choseMode && (
                <div className={"flex justify-end"}>
                    <Button type={"button"} onClick={() => alert(uuid)}>Choisir</Button>
                </div>
            )}
        </div>

    );
}

export default Car;