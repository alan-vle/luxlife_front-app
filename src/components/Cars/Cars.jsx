import Car from "@/components/Cars/Car.jsx";
import ImageAndTextLoader from "@/components/Loader/ImageAndTextLoader.jsx";
import Pagination from "@/utils/Pagination.jsx";
import {useEffect, useState} from "react";
import {getAllAgencies} from "@/service/api/AgenciesService.jsx";
import {getAllCars} from "@/service/api/CarsService.jsx";

function Cars({
    cars: carsProp = null,
    displayAgencies,
    choseMode
}) {
    const [cars, setCars] = useState(carsProp)
    const [paramsFilter, setParamsFilter] = useState(null)

    useEffect(() => {
        fetchCars().then(result => setCars(result))
    }, [])
    async function fetchCars() {
        return await getAllCars(paramsFilter);
    }

    return (
        <div className={"mb-8"}>
            <div className={"grid grid-cols-1 md:grid-cols-8 lg:grid-cols-8 md:pl-8 lg:pl-8 mb-8"}>
                {cars !== null && cars.length > 0 ? cars.map(car => <Car {...car} displayAgency={displayAgencies} choseMode={choseMode}/>) : <ImageAndTextLoader />}
            </div>
            <div className={"grid justify-items-center"}>
                <Pagination pageMax={8} />
            </div>
        </div>
    );
}

export default Cars;