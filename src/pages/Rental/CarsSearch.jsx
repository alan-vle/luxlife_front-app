import {useLocation} from "react-router";
import {useEffect, useState} from "react";
import {getAllCars} from "@/service/api/CarsService.jsx";
import Cars from "@/components/Cars/Cars.jsx";


function CarsSearch() {
    const location = useLocation();
    const rentalFields = location.state
    const [cars, setCars] = useState(null)
    const [paramFilter, setParamsFilter] = useState({agency: `/agencies/${rentalFields.agencyUuid}`})

    useEffect(() => {
        fetchCarsByAgency().then(result => setCars(result))
    }, []);

    async function fetchCarsByAgency() {
        const params = {
            status: 2,
            ...paramFilter
        }
        console.log(params)
        return await getAllCars(params)
    }

    return(
        <div>
            <div className={"grid grid-cols-8 mt-8 mb-48"}>
                <div className={"shadow-md"}>Agency de départ : {rentalFields.fromAgency}</div>
                <div className={"shadow-md"}>Type de location : {rentalFields.rentalType === 0 ? "Classique" :  "LLD"}</div>
                <div className={"shadow-md"}>Du : {rentalFields.fromDate}</div>
                <div className={"shadow-md"}>à : {rentalFields.fromTime}</div>
                {null !== rentalFields.toAgency && (<div className={"shadow-md"}>Agence de retour : {rentalFields.toAgency}</div>)}
                <div className={"shadow-md"}>Au : {rentalFields.toDate}</div>
                <div className={"shadow-md"}>à : {rentalFields.toTime}</div>
            </div>
            <div className={"mt-8"}><Cars cars={cars} /></div>
        </div>

);
}

export default CarsSearch;