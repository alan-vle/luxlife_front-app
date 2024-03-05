import {Typography} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";

const Agency = ({
    address,
    city,
    status,
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
            : ''

    );
}

export default Agency;