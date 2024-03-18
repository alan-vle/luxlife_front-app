import {Button, Card, CardBody, CardFooter, Typography} from "@material-tailwind/react";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faRotate} from "@fortawesome/free-solid-svg-icons";
import {patchRental} from "@/service/api/RentalsService.jsx";
const apiUrl = import.meta.env.VITE_API_URL;

const Rental = ({
    agency,
    fromDate,
    toDate,
    car,
    contract,
    status,
    price,
    mileageKilometers,
    currentRental = false,
    uuid
}) => {

    return (
        <>
            {currentRental ?
                <Card className={"h-full p-2"}>
                    <CardBody className={"flex flex-col gap-4"}>
                        <div className={"mb-4"}>
                            <img src={`${apiUrl}/${car.contentUrl}`} alt={"car image " + car.model}/>
                            <Typography variant={"h4"} className={"font-bold mt-8"}>
                                {car.manufacturer.name} {car.model} <br />
                            </Typography>
                        </div>
                        <div>
                            <Typography variant={"paragraph"} className={"font-bold"}>
                                Forfait :
                                <span className={"font-normal ml-1"}>{mileageKilometers} km</span>
                            </Typography>
                            <Typography variant={"paragraph"} className={"font-bold"}>
                                Contract :
                                <span className={"font-normal ml-1"}>{contract}</span>
                            </Typography>
                        </div>
                        <div>
                            <Typography variant={"paragraph"} className={"font-bold"}>
                                Agence :
                                <span className={"font-normal ml-1"}>{agency.address} {agency.city}</span>
                            </Typography>
                        </div>
                        <div>
                            <Typography variant={"paragraph"} className={"font-bold"}>
                                Du :
                                <span className={"font-normal ml-1"}>{dateFormatter(fromDate)}</span>
                            </Typography>
                        </div>
                        <div>
                            <Typography variant={"paragraph"} className={"font-bold"}>
                                Au :
                                <span className={"font-normal ml-1"}>{dateFormatter(toDate)}</span>
                            </Typography>
                        </div>
                        <div className={"flex justify-end"}>
                            <Typography variant={"paragraph"} className={"font-bold text-2xl"}>
                                <span>TTC</span> <br />
                                <span className={"font-normal ml-1"}>{price} </span>€
                            </Typography>
                        </div>
                    </CardBody>
                    <CardFooter>
                        {'Draft' === status && (
                            <Button type={"button"} variant={"filled"} onClick={() => patchRental(uuid, {'draftRental': false})}>Valider</Button>
                        )}
                    </CardFooter>
                </Card>
            :
                <Card>
                    <CardBody>
                        <div className={"flex flex-col"}>
                            <img src={`${apiUrl}/${car.contentUrl}`} className={"w-[300px] max-w-[300px] h-[169px] max-h-[169px]"} alt={"car image " + car.model}/>
                            <Button type={"button"} variant={"outlined"}><FontAwesomeIcon icon={faRotate} /> Relouer</Button>
                        </div>
                        <div className={"xl:col-span-3 2xl:col-span-3"}>
                            <Typography variant={"h4"} className={"font-bold mt-8"}>
                                {car.manufacturer.name} {car.model} <br />
                                {car.kilometers} km
                            </Typography>
                        </div>
                        Type de contract : {contract}
                    </CardBody>
                </Card>
            }

        </>
    )
}

function dateFormatter(dateISO8601) {
    let date = new Date(dateISO8601);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const dateOptions = {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    };


    const formattedDate = date.toLocaleDateString('fr-FR', dateOptions);
    const hoursOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };

    const formattedHours = date.toLocaleTimeString('fr-FR', hoursOptions);

    return `${formattedDate} à ${formattedHours}`;
}
export default Rental