import {useRentalFormContext} from "@/store/RentalFormContext.jsx";
import {Button, Card, CardBody, CardFooter, CardHeader, Typography} from "@material-tailwind/react";
import React from "react";
import {useNavigate} from "react-router";
const apiUrl = import.meta.env.VITE_API_URL;

const RentalProcess = () => {
    const {formData} = useRentalFormContext()
    const goTo = useNavigate()
    const car = null !== formData.car ? formData.car : null
    alert(car)
    if(null === car) {
        goTo('/not-found')
    }

    return (
        <div className={"grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 lg:gap-8 xl:grid-cols-12 2xl:grid-cols-12 gap-2 pl-8 pt-4"}>
            <div className={"col-span-10 flex justify-end"}>
                <Card className="mt-6 w-96">
                    <CardHeader color="blue-gray" className="relative h-36">
                        <img src={`${apiUrl}/${car.contentUrl}`} alt={`${car.model} image`}/>
                    </CardHeader>
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {car.manufacturer} <br />{car.model}
                        </Typography>
                        <Typography>
                            {car.kilometers}
                        </Typography>
                    </CardBody>
                </Card>
            </div>
            <div className={"xl:col-span-4 2xl:col-span-4 shadow-lg"}>
                <Typography as={"h5"} variant={"h5"}>
                    <span className={"p-2 border-b-4 border-black"}>
                        Informations de départ
                    </span>
                </Typography>
            </div>
            <div className={"xl:col-span-4 2xl:col-span-4 shadow-lg"}>
                <Typography as={"h5"} variant={"h5"}>
                    <span className={"p-2 border-b-4 border-black"}>
                        Informations de retour
                    </span>
                </Typography>
            </div>
        </div>
    )
}

export default RentalProcess;