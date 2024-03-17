import {Button, Card, CardBody, Typography} from "@material-tailwind/react";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRotate} from "@fortawesome/free-solid-svg-icons";
const apiUrl = import.meta.env.VITE_API_URL;

const Rental = ({
    car,
    contract,
    mileageKilometers,
    currentRental = false
}) => {

    return (
        <>
            {currentRental ?
                <Card>
                    <CardBody>
                        <div className={"flex flex-row"}>
                            <div className={"flex flex-col"}>
                                <img src={`${apiUrl}/${car.contentUrl}`} className={"w-[300px] max-w-[300px] h-[169px] max-h-[169px]"} alt={"car image " + car.model}/>
                            </div>
                            <div>
                                <Typography variant={"h4"} className={"font-bold"}>Forfait : {mileageKilometers}</Typography>
                                <Typography variant={"h4"} className={"font-bold mt-8"}>
                                    {car.manufacturer.name} {car.model} <br />
                                    {car.kilometers} km
                                </Typography>
                            </div>
                        </div>

                        Type de contract : {contract}
                    </CardBody>
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

export default Rental