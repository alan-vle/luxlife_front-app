import {useLocation} from "react-router";
import {useEffect, useState} from "react";
import {getAllCars} from "@/service/api/CarsService.jsx";
import Cars from "@/components/Cars/Cars.jsx";
import RentalForm from "@/components/Home/Rental/RentalForm.jsx";
import {Card, CardBody} from "@material-tailwind/react";


function CarsSearch() {
    const location = useLocation();
    const rentalFields = location.state
    const [cars, setCars] = useState(null)
    const [paramFilter, setParamsFilter] = useState({agency: `/agencies/${rentalFields.agencyUuid}`})

    useEffect(() => {
        fetchCarsByAgency().then(result => setCars(result))
    }, [paramFilter]);

    async function fetchCarsByAgency() {
        const params = {
            status: 2,
            ...paramFilter
        }

        return await getAllCars(params)
    }

    return(
        <>
            <div className={"grid grid-cols-12 mt-8 mb-48 w-full"}>
                <div className="col-start-2 col-span-8">
                    <Card>
                        <CardBody>
                            <RentalForm
                                fromAgency={rentalFields.fromAgency}
                                agencyUuid={rentalFields.agencyUuid}
                                rentalType={rentalFields.rentalType}
                                fromDate={rentalFields.fromDate}
                                fromTime={rentalFields.fromTime}
                                toAgency={rentalFields.toAgency}
                                toDate={rentalFields.toDate}
                                toTime={rentalFields.toTime}
                            />
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className={"mt-8"}><Cars choseMode={true} agency={rentalFields.agencyUuid}/></div>
        </>

);
}

export default CarsSearch;