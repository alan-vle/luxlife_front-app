import {Typography} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot, faPenToSquare} from "@fortawesome/free-solid-svg-icons";

const Agency = ({
    address,
    city,
    status,
    totalRentals = null,
    index,
    tdMode
}) => {
    const classes = "p-4 border-b border-blue-gray-50";

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
            <div className={"flex flex-col justify-center shadow rounded text-center w-96"}>
                <div><FontAwesomeIcon icon={faLocationDot} /> {address}, {city}</div>
                <div>{status}</div>
                <div>Nombre de locations : {totalRentals}</div>
            </div>

    );
}

export default Agency;