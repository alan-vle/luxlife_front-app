import Car from "@/components/Cars/Car.jsx";
import ImageAndTextLoader from "@/components/Loader/ImageAndTextLoader.jsx";
import Pagination from "@/utils/Pagination.jsx";
import {useEffect, useState} from "react";
import {getAllAgencies} from "@/service/api/AgenciesService.jsx";
import {getAllCars, getAllManufacturers} from "@/service/api/CarsService.jsx";
import {Option, Select} from "@material-tailwind/react";
import login from "@/pages/Auth/Login.jsx";
import {filterRemover, filterUpdater} from "@/utils/filter/objectFilter.js";
import AsyncSelect from "@/BugFixer/AsyncSelect.jsx";

function Cars({
    cars: carsProp = null,
    displayAgencies,
    choseMode
}) {
    const [cars, setCars] = useState(carsProp)
    const [paramsFilter, setParamsFilter] = useState(null)
    const [allManufacturers, setAllManufacturers] = useState(null)
    const [manufacturerValue, setManufacturerValue] = useState("*")
    const [options, setOptions] = useState(null)
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
        alert(value)
        setManufacturerValue(value)
        alert(manufacturerValue)
    }
    return (
        <div className={"mb-8"}>
            <div className={"grid grid-cols-4"}>
                <div className="w-28">
                    {allManufacturers && (
                        <Select variant="outlined" label="Fabriquant" onChange={manufacturerHandler} value={manufacturerValue}>
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
            <div className={"grid grid-cols-1 md:grid-cols-8 lg:grid-cols-8 md:pl-8 lg:pl-8 mb-8"}>
                {
                    null === cars ? <ImageAndTextLoader />
                        : cars.length === 0 ? (
                            <h2>Aucune voiture trouvé.</h2>
                            ) : (
                                cars.map(car => <Car {...car} displayAgency={displayAgencies} choseMode={choseMode}/>)
                            )
                }
            </div>
            <div className={"grid justify-items-center"}>
                <Pagination pageMax={8} />
            </div>
        </div>
    );
}

export default Cars;