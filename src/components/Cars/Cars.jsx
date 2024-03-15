import Car from "@/components/Cars/Car.jsx";
import ImageAndTextLoader from "@/components/Loader/ImageAndTextLoader.jsx";
import Pagination from "@/utils/Pagination.jsx";
import {useEffect, useState} from "react";
import {getAllAgencies} from "@/service/api/AgenciesService.jsx";
import {getAllCars, getAllManufacturers} from "@/service/api/CarsService.jsx";
import {Option, Select} from "@material-tailwind/react";
import login from "@/pages/Auth/Login.jsx";
import {filterRemover, filterUpdater} from "@/utils/filter/objectFilter.js";

function Cars({
    cars: carsProp = null,
    displayAgencies,
    agency: agencyProp = null,
    choseMode
}) {
    const [cars, setCars] = useState(carsProp)
    const [paramsFilter, setParamsFilter] = useState(agencyProp ? {agency: `/agencies/${agencyProp}` } : null)
    const [allManufacturers, setAllManufacturers] = useState(null)
    const [selectedManufacturer, setSelectedManufacturer] = useState("*")

    useEffect(() => {
        if(null === allManufacturers) {
            fetchManufacturers().then(result => setAllManufacturers(result))
        }

        fetchCars().then(result => setCars(result))
    }, [paramsFilter])

    async function fetchCars() {
        return await getAllCars(paramsFilter);
    }

    async function fetchManufacturers() {
        return await getAllManufacturers();
    }

    async function fetchCarsByModel() {
        return await getAllManufacturers();
    }

    const manufacturerHandler = (value) => {
        if("*" !== value) {
            filterUpdater('manufacturer', `/manufacturers/${value}`, setParamsFilter)
        } else {
            filterRemover('manufacturer', paramsFilter, setParamsFilter)
        }

        setSelectedManufacturer(value)
    }
    return (
        <div className={"mb-[800px]"}>
            <div className={"grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 lg:gap-8 xl:grid-cols-3 2xl:grid-cols-6 pl-8 mb-8 flex flex-col gap-2"}>
                <div>
                    {allManufacturers && (
                        <Select variant="outlined" label="Fabriquant" onChange={manufacturerHandler} value={selectedManufacturer}>
                            <Option value="*">Tous</Option>
                            {allManufacturers.map((manufacturer, index) => (
                                <Option key={index} value={manufacturer.uuid} name={manufacturer.name}>
                                    {manufacturer.name}
                                </Option>
                            ))}
                        </Select>
                    )}
                </div>
                <div>
                    {
                        cars && (
                            <Select variant="outlined" label="Modèle">
                                <Option value={"*"}>Tous</Option>
                                {cars.map((car, index) => (
                                    <Option key={index} value={car.uuid}>
                                        {car.model}
                                    </Option>
                                ))}
                            </Select>
                        )
                    }
                </div>
            </div>
            <div className={"grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 md:pl-8 lg:pl-8 mb-8 min-h-28"}>
                {
                    null === cars && null !== agencyProp ? <ImageAndTextLoader />
                        : null === cars || cars.length === 0 ? (
                            <h2>Aucune voiture trouvé.</h2>
                            ) : (
                                cars.map(car => <Car {...car} displayAgency={displayAgencies} choseMode={choseMode}/>)
                            )
                }
            </div>
            {/*<div className={"grid justify-items-center"}>*/}
            {/*    <Pagination pageMax={8} />*/}
            {/*</div>*/}
        </div>
    );
}

export default Cars;