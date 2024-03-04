import {Typography} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";

const Agency = ({
    address,
    city,
    index,
    status
}) => {
    return (
        <tr key={index}>
            <td>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                >
                    {address}
                </Typography>
            </td>
            <td>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                >
                    {city}
                </Typography>
            </td>
            <td>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                >
                    {status}
                </Typography>
            </td>
            <td>
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
    );
}

export default Agency;