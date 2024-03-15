import {Button, Card, CardBody, CardFooter, CardHeader, Typography} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faLocationDot, faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router";
import {IsCustomer, IsDirector} from "@/utils/CurrentUser.js";
import {isAuth} from "@/utils/auth.js";

const Agency = ({
    address,
    city,
    status,
    openingHours,
    closingHours,
    isOpen,
    totalRentals = null,
    uuid,
    index,
    tdMode
}) => {
    const classes = "p-4 border-b border-blue-gray-50";
    const goTo = useNavigate('')
    return (
        tdMode ? (
            <tr key={index} className={"hover:bg-blue-gray-100"}>
                <td className={classes}>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        {address}
                    </Typography>
                </td>
                <td className={classes}>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        {city}
                    </Typography>
                </td>
                <td className={classes}>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        {status}
                    </Typography>
                </td>
                <td className={classes}>
                    <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                    >
                        <FontAwesomeIcon icon={faPenToSquare} style={{color: "#e01b24"}} />
                    </Typography>
                </td>
            </tr>
            )
            :
            <Card className="w-96 mt-8">
                <CardHeader color="blue-gray" className="relative h-56" children={""}></CardHeader>
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                        <FontAwesomeIcon icon={faLocationDot} /> {address} {city}
                    </Typography>
                    <Typography>
                        <FontAwesomeIcon icon={faClock} /> {isOpen ? 'Ouverte' : 'Fermée'} <br />
                        Horaires : <br />
                        {openingHours} - {closingHours}
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0 flex justify-between">
                    {!isAuth() && IsCustomer || !IsDirector() && (
                        <Button type={"button"}
                                onClick={() => {
                                    const rentalFields = {
                                        fromAgency: city,
                                        agencyUuid: uuid,
                                    }

                                    goTo('/cars/search-result', {state: rentalFields})
                                }}
                        >
                            Voir les voitures disponibles
                        </Button>
                    )}
                </CardFooter>
            </Card>
    );
}

export default Agency;