import {Button, Card, CardBody, Typography} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleChevronLeft, faCircleChevronRight} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {getAllCars} from "@/service/CarsService.jsx";
import ImageAndTextLoader from "@/components/Loader/ImageAndTextLoader.jsx";
import Cars from "@/components/Cars/Cars.jsx";

const ListOfCars = ({additionalContent}) => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        fetchData().then(result => setCars(result));
    }, []);

    async function fetchData() {
        return await getAllCars();
    }

    return<Cars cars={cars} />;
}

export default ListOfCars;