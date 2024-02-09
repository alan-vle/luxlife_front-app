import {Button, Card, CardBody, Typography} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleChevronLeft, faCircleChevronRight} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {getAllCars} from "@/service/CarsService.jsx";
import ImageAndTextLoader from "@/components/Loader/ImageAndTextLoader.jsx";

const ListOfCars = ({additionalContent}) => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        fetchData().then(result => setCars(result));
    }, []);

    async function fetchData() {
        return await getAllCars();
    }

    return(
       <div className={"grid grid-cols-8 gap-4"}>
           <div className={"flex items-center"}><FontAwesomeIcon icon={faCircleChevronLeft} size={"2xl"}/></div>
           {cars.length === 0 ? <ImageAndTextLoader /> : (
               <>
                   {cars.map(car => (
                       <div key={car.id} className={"col-span-2"}>
                           <Card>
                               <CardBody>
                                   <src src={""} alt={"Car image"} />
                                   <Typography as={"h4"} className={"font-semibold"}>
                                       {car.manufacturer.name} {car.model}
                                   </Typography>
                                   <Typography as={"paragraph"}>{car.kilometers} kms</Typography>
                                   {null !== additionalContent && (
                                        <Button type={"button"}>Choisir</Button>
                                   )}
                               </CardBody>
                           </Card>
                       </div>
                   ))}
               </>
           )
           }
           <div className={"flex items-center ml-24"}><FontAwesomeIcon icon={faCircleChevronRight} size={"2xl"}/></div>
       </div>
    )
}

export default ListOfCars;